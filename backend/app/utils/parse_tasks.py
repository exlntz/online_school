"""
Парсер задач shkolkovo.online -> JSON с настоящим LaTeX / Markdown.
Математика, русский, физика, информатика (и любой другой предмет по SubjectId).

Ключевая идея
-------------
Весь контент лежит в TexSessionsMap, и настоящий дискриминатор -- это IsHtml,
а НЕ IsMathJax (на математике это работало случайно):

  | IsHtml | IsMathJax | что это              | где              | index.tex |
  |--------|-----------|----------------------|------------------|-----------|
  | false  | false     | LaTeX -> SVG         | мат/физ/инф      | ЕСТЬ      |
  | true   | true      | текст с \\( ... \\)   | мат (планы)      | 404       |
  | true   | false     | HTML-вёрстка         | РУССКИЙ (100%)   | 404       |

Для IsHtml=false дёргаем ИСХОДНИК вместо скачивания сотен SVG:

    GET /api/latex-service/v1/GetSession/{session_id}/index.tex  ->  200 text/x-tex

Получаем  $a\\in \\{2\\sqrt{2}\\}\\cup \\left[3;\\dfrac{11}{3}\\right)$
вместо мусора из alt  '     √ -  [  11)\\na ∈{2  2} ∪ 3; 3 '

Для IsHtml=true в latex-сервис НЕ ходим вообще (там 404) -- это экономит
тысячи бесполезных запросов на русском.

Что важно по предметам
----------------------
* РУССКИЙ    -- смысловая разметка (<u> подчёркивания, <strong>, <em>, подсветка фона)
                конвертируется в Markdown, а не выбрасывается. Общий текст задания
                лежит в dependencies.QuestionContent и цепляется по RelatesToQuestionContentId.
* ИНФОРМАТИКА-- блоки verbatim с питоном защищены от нормализации пробелов (отступ =
                синтаксис), tabular -> Markdown-таблица, файлы задачи (27_2_A.txt/.xlsx)
                резолвятся через /api/storage.
* ФИЗИКА     -- чертежи, критерии оценивания, планы решения, ответ с обоснованием.

Ответы бывают двух видов: Answer.text (простая строка) и Answer.TexSessionId
(LaTeX). Оба сводятся к единому блоку answer. Многострочный text разбивается
в answer_lines, но ВНИМАНИЕ: смысл строк зависит от предмета -- у русского это
взаимозаменяемые варианты, у информатики 27 -- последовательные части одного
ответа. Подробнее в split_answer_lines().
"""

import asyncio
import html as html_module
import json
import re
from pathlib import Path

import httpx
from bs4 import BeautifulSoup, Comment, NavigableString

# ----------------------------------------------------------------------------
# КОНФИГ
# ----------------------------------------------------------------------------

BASE = "https://3.shkolkovo.online"
LATEX_API = f"{BASE}/api/latex-service/v1/GetSession"
STORAGE_API = f"{BASE}/api/storage"          # прямой /st/... отдаёт 503, только через API

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept-Language": "ru-RU,ru;q=0.9",
}

# Если каталог начнёт отдавать 503 с JS-проверкой -- скопируй cookies из браузера:
# F12 -> Application -> Cookies -> 3.shkolkovo.online. Нужны в первую очередь те,
# что ставит антибот, плюс сессионные, если хочешь видеть скрытые ответы.
COOKIES = {}

# Предметы для сбора. Ключ -- SubjectId, значение -- имя папки в JSON.
SUBJECTS = {
    1: "math",
    2: "russ",
    4: "phys",
    30: "inf",
}

# Заготовка: остальные предметы платформы (ID проверены в списке Subject).
# Перенеси нужное в SUBJECTS -- код полностью предметно-независимый.
OTHER_SUBJECTS = {
    11: "chem", 12: "bio", 15: "hist", 41: "soc", 17: "eng", 5: "inf_prof",
    31: "oge_math", 32: "oge_russ", 33: "oge_phys", 34: "oge_inf",
    35: "oge_soc", 36: "oge_bio",
}

urls_map = {f"{BASE}/catalog?SubjectId={sid}": name for sid, name in SUBJECTS.items()}

SUBTHEMES_FILE = "all_subthemes.json"
OUTPUT_FILE = "all_tasks.json"
TEX_CACHE_DIR = Path("tex_cache")        # .tex кэшируется на диск, сессии переиспользуются
ATTACH_DIR = Path("attachments")         # куда качать файлы задач (если включено)
DOWNLOAD_ATTACHMENTS = False             # True -> качать .txt/.xlsx к заданиям информатики
MAX_CONCURRENCY = 5                      # одновременных запросов к latex-сервису
PAGE_DELAY = 0.3                         # пауза между страницами каталога
RETRIES = 3


# ============================================================================
#  1. СБОР ССЫЛОК НА ПОДТЕМЫ  (логика не менялась, только предметы из SUBJECTS)
# ============================================================================

async def fetch_subthemes():
    all_data = {}
    async with httpx.AsyncClient(headers=HEADERS, cookies=COOKIES,
                                 timeout=30.0) as client:
        for url, subject in urls_map.items():
            print(f"Собираем ссылки для: {subject}...")
            response = await client.get(url)

            soup = BeautifulSoup(response.text, "lxml")
            a = soup.find_all("div", class_="VariantStyles_variantsList__links_row__yi7mS")

            subthemes = {}
            for el in a:
                key = el.text.strip()
                link_tag = el.find("a")
                if link_tag and link_tag.get("href"):
                    subthemes[key] = BASE + link_tag.get("href")

            all_data[subject] = subthemes
            print(f"   найдено подтем: {len(subthemes)}")

    with open(SUBTHEMES_FILE, "w", encoding="utf-8") as f:
        json.dump(all_data, f, ensure_ascii=False, indent=4)
    print(f"Готово! Все ссылки сохранены в файл {SUBTHEMES_FILE}")


# ============================================================================
#  2. ЗАЩИТА КОДА И ТАБЛИЦ  (новое)
# ============================================================================

CODE_ENVS = ("verbatim", "lstlisting", "minted", "Verbatim")
CODE_TOKEN = "@@CODE{}@@"                # без пробелов -- выживает нормализацию


def extract_code_blocks(body):
    """
    Вырезает блоки кода ДО любой обработки.

    Зачем: в решениях информатики лежит питон в \\begin{verbatim}. Нормализация
    пробелов (_tidy) срезала отступы, и код становился нерабочим:
        for i in range(4119):
        star = list(...)        <- отступ съеден
    Плюс в коде бывают % и \\\\, которые ниже вычищаются как LaTeX-синтаксис.
    """
    codes = []
    for env in CODE_ENVS:
        pattern = re.compile(r"\\begin\{" + env + r"\}(.*?)\\end\{" + env + r"\}", re.S)
        while True:
            m = pattern.search(body)
            if not m:
                break
            codes.append(m.group(1).strip("\n"))
            body = body[:m.start()] + CODE_TOKEN.format(len(codes) - 1) + body[m.end():]
    return body, codes


def guess_lang(code):
    if re.search(r"\b(def |print\(|import |for .* in |open\(|elif |range\()", code):
        return "python"
    if re.search(r"\b(begin|end;|writeln|program |var )\b", code, re.I):
        return "pascal"
    if re.search(r"#include|cout|int main", code):
        return "cpp"
    return ""


def restore_code_blocks(text, codes, fenced=True):
    """Возвращает код дословно ПОСЛЕ нормализации пробелов."""
    for i, code in enumerate(codes):
        token = CODE_TOKEN.format(i)
        block = f"\n```{guess_lang(code)}\n{code}\n```\n" if fenced else f"\n{code}\n"
        text = text.replace(token, block)
    return text


# --- tabular -> Markdown ----------------------------------------------------

def _split_cells(row):
    """Делит строку таблицы по & с учётом вложенных { } и \\&."""
    cells, depth, cur = [], 0, []
    i = 0
    while i < len(row):
        ch = row[i]
        if ch == "\\" and i + 1 < len(row) and row[i + 1] in "&%$_{}":
            cur.append(row[i:i + 2])
            i += 2
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        if ch == "&" and depth == 0:
            cells.append("".join(cur))
            cur = []
        else:
            cur.append(ch)
        i += 1
    cells.append("".join(cur))
    return cells


def _clean_cell(c):
    c = re.sub(r"\\(?:hline|toprule|midrule|bottomrule)\b", " ", c)
    c = re.sub(r"\\cline\{[^}]*\}", " ", c)
    # \multicolumn{2}{|c|}{текст} -> текст
    c = re.sub(r"\\multicolumn\{\d+\}\{[^}]*\}\{(.*?)\}", r"\1", c, flags=re.S)
    c = re.sub(r"\\multirow\{\d+\}(?:\{[^}]*\})?\{(.*?)\}", r"\1", c, flags=re.S)
    c = c.replace("\\newline", " ").replace("\\par", " ")
    c = " ".join(c.split())
    return c.replace("|", r"\|")          # | внутри ячейки ломает Markdown-таблицу


def convert_tabulars(body):
    """
    \\begin{tabular}{|c|c|} ... \\end{tabular}  ->  Markdown-таблица.
    В информатике так задан граф дорог (матрица смежности) -- без конвертации
    задача нечитаема. Математику в ячейках ($..$) не трогаем.
    """
    pattern = re.compile(
        r"\\begin\{(tabular|longtable|tabularx)\}\s*(?:\[[^\]]*\])?\s*(?:\{[^{}]*\}\s*)?"
        r"(.*?)\\end\{\1\}", re.S)

    def one(m):
        inner = m.group(2)
        inner = re.sub(r"\\(?:hline|toprule|midrule|bottomrule)\b", "", inner)
        inner = re.sub(r"\\cline\{[^}]*\}", "", inner)
        rows = [r for r in re.split(r"\\\\", inner)]
        table = []
        for r in rows:
            if not r.strip():
                continue
            table.append([_clean_cell(c) for c in _split_cells(r)])
        if not table:
            return " "
        width = max(len(r) for r in table)
        table = [r + [""] * (width - len(r)) for r in table]
        head = table[0]
        # если первая строка пустая, делаем безымянную шапку
        if not any(head):
            head = [f"c{i + 1}" for i in range(width)]
            rest = table
        else:
            rest = table[1:]
        out = ["| " + " | ".join(head) + " |",
               "|" + "|".join(["---"] * width) + "|"]
        for r in rest:
            out.append("| " + " | ".join(r) + " |")
        return "\n\n" + "\n".join(out) + "\n\n"

    prev = None
    while prev != body:                      # вложенные таблицы
        prev = body
        body = pattern.sub(one, body)
    return body


# ============================================================================
#  3. РАЗБОР LaTeX
# ============================================================================

DOC_BODY_RE = re.compile(r"\\begin\{document\}(.*?)\\end\{document\}", re.S)

# Чертежи. Регуляркой не обойтись: у сайта ДВА разных определения \pict в преамбулах --
#   \newcommand{\pict}[2][1]{...\includegraphics[scale=#1]{#2}}        -> \pict[.3]{f.png}
#   \newcommand{\pict}[3][1]{...\includegraphics[scale=#1]{#2#3}}      -> \pict{}{f.png}
# во втором случае имя файла это СКЛЕЙКА двух аргументов, а первый бывает пустым.
FIGURE_CMDS = ("includegraphics", "pict")


def _read_group(s, i, open_ch, close_ch):
    """Читает сбалансированную группу начиная с s[i]==open_ch. -> (содержимое, новый i)."""
    if i >= len(s) or s[i] != open_ch:
        return None, i
    depth, start = 1, i + 1
    i += 1
    while i < len(s) and depth:
        depth += {open_ch: 1, close_ch: -1}.get(s[i], 0)
        i += 1
    return s[start:i - 1], i


def replace_figures(body, on_figure):
    """Заменяет \\includegraphics / \\pict на результат on_figure(имя_файла)."""
    out, i = [], 0
    while i < len(body):
        nxt = None
        for cmd in FIGURE_CMDS:
            j = body.find("\\" + cmd, i)
            if j != -1 and (nxt is None or j < nxt[0]):
                nxt = (j, cmd)
        if nxt is None:
            out.append(body[i:])
            break
        j, cmd = nxt
        out.append(body[i:j])
        k = j + len(cmd) + 1
        while k < len(body) and body[k] in " \t\n":
            k += 1
        _opt, k = _read_group(body, k, "[", "]")          # необязательный [scale]
        while k < len(body) and body[k] in " \t\n":
            k += 1
        a1, k = _read_group(body, k, "{", "}")
        if a1 is None:                                    # не вызов -- отдаём как есть
            out.append(body[j:k or j + 1])
            i = max(k, j + 1)
            continue
        save = k
        while k < len(body) and body[k] in " \t\n":
            k += 1
        a2, k2 = _read_group(body, k, "{", "}")
        if a2 is not None:
            name, i = (a1 + a2).strip(), k2             # форма \pict{}{file.png}
        else:
            name, i = a1.strip(), save
        out.append(on_figure(name) if name else "")
    return "".join(out)


# Макросы без аргументов из преамбулы сайта.
# Лукахед (?![A-Za-z]) обязателен, иначе \R съест начало \Rarr, а \a -- начало \alpha.
SIMPLE_MACROS = {
    r"\Lrarr": r"\quad\Leftrightarrow\quad",
    r"\Rarr": r"\quad\Rightarrow\quad",
    r"\lra": r"\quad\Leftrightarrow\quad",
    r"\ra": r"\quad\Rightarrow\quad",
    # \vertex НЕ определён ни в одной преамбуле -- опечатка авторов вместо \text{в}
    # (вершина параболы). KaTeX на нём падает, поэтому подставляем осмысленное.
    r"\vertex": r"\text{в}",
    r"\vsh": r"\text{в}",
    r"\mbgeq": r"\stackrel{?}{\geqslant}",
    r"\mbleq": r"\stackrel{?}{\leqslant}",
    r"\mbg": r"\stackrel{?}{>}",
    r"\mbl": r"\stackrel{?}{<}",
    r"\tri": r"\bigtriangleup",
    r"\prl": r"\parallel",
    r"\eps": r"\varepsilon",
    r"\dev": r"\vdots",
    r"\R": r"\mathbb{R}",
    r"\N": r"\mathbb{N}",
    r"\Z": r"\mathbb{Z}",
    r"\a": r"\angle",
    r"\q": r"\quad",
}

# Чисто оформительские команды -- выкидываем вместе с аргументом в фигурных скобках
DROP_WITH_ARG = ["vspace", "hspace", "setcounter", "label", "smash", "raisebox"]
# ... и без аргумента
DROP_BARE = [
    "vsp", "minvsp", "noindent", "indent", "par", "bigskip", "medskip",
    "smallskip", "newpage", "clearpage", "centering", "displaystyle",
]

# Текстовые маркеры-макросы сайта
TEXT_MARKERS = {
    r"\ans": "\n\n**Ответ**\n",
    r"\sol": "\n\n**Решение**\n",
    r"\proof": "\n\n**Доказательство**\n",
}

# Окружения, которые KaTeX/MathJax не умеют -- предупреждаем, чтобы ты знал что чинить
UNSUPPORTED = {
    r"\systeme": r"\systeme{} (пакет systeme, KaTeX не поддерживает)",
}


def _strip_cmd_with_arg(text, name):
    """Убирает \\name{...} с корректным подсчётом вложенных скобок."""
    out = []
    i = 0
    needle = "\\" + name
    while i < len(text):
        j = text.find(needle, i)
        if j == -1:
            out.append(text[i:])
            break
        out.append(text[i:j])
        k = j + len(needle)
        # необязательный [..]
        while k < len(text) and text[k] in " \t":
            k += 1
        if k < len(text) and text[k] == "[":
            depth = 1
            k += 1
            while k < len(text) and depth:
                depth += {"[": 1, "]": -1}.get(text[k], 0)
                k += 1
        while k < len(text) and text[k] in " \t":
            k += 1
        if k < len(text) and text[k] == "{":
            depth = 1
            k += 1
            while k < len(text) and depth:
                depth += {"{": 1, "}": -1}.get(text[k], 0)
                k += 1
        i = k
    return "".join(out)


def _expand_arg_macro(text, name, template):
    """\\skob{X} -> \\left( X \\right)   /   \\Mod{X} -> \\ (\\mathrm{mod}\\ X)"""
    needle = "\\" + name
    while True:
        j = text.find(needle)
        if j == -1:
            return text
        k = j + len(needle)
        while k < len(text) and text[k] in " \t":
            k += 1
        if k >= len(text) or text[k] != "{":
            # нет аргумента -- просто выкидываем команду, иначе зацикливаемся
            text = text[:j] + text[j + len(needle):]
            continue
        depth = 1
        start = k + 1
        k += 1
        while k < len(text) and depth:
            depth += {"{": 1, "}": -1}.get(text[k], 0)
            k += 1
        inner = text[start:k - 1]
        text = text[:j] + template.replace("#1", inner) + text[k:]


def expand_macros(s, is_math):
    """Разворачивает кастомные макросы сайта в стандартный LaTeX."""
    s = _expand_arg_macro(s, "skob", r"\left( #1 \right)")
    s = _expand_arg_macro(s, "Mod", r"\ (\mathrm{mod}\ #1)")

    if is_math:
        # sqcases -- кастомное окружение сайта ("совокупность", система в кв. скобках).
        # KaTeX его не знает. Спецификатор колонок @{} он тоже не умеет, поэтому
        # разворачиваем в простой array{ll}.
        s = s.replace(r"\begin{sqcases}", r"\left[\begin{array}{ll}")
        s = s.replace(r"\end{sqcases}", r"\end{array}\right.")
        # окружение \begin{al} (алиас aligned) встречается в преамбулах сайта
        s = s.replace(r"\begin{al}", r"\begin{aligned}")
        s = s.replace(r"\end{al}", r"\end{aligned}")
        # висящий \\ или \ в самом конце формулы -- KaTeX падает
        s = re.sub(r"(?:\\\\|\\)\s*$", "", s.strip())

    if not is_math:
        s = _expand_arg_macro(s, "fact", r"**Факт #1**")
        s = _expand_arg_macro(s, "textbf", r"**#1**")
        s = _expand_arg_macro(s, "underline", r"#1")
        s = _expand_arg_macro(s, "textit", r"*#1*")
        s = _expand_arg_macro(s, "emph", r"*#1*")
        s = _expand_arg_macro(s, "texttt", r"`#1`")
        for macro, repl in TEXT_MARKERS.items():
            # lambda, а не строка: в repl есть \, и re.sub принял бы их за escape-группы
            s = re.sub(re.escape(macro) + r"(?![A-Za-z])", lambda _m, r=repl: r, s)

    for name in DROP_WITH_ARG:
        s = _strip_cmd_with_arg(s, name)
    for name in DROP_BARE:
        s = re.sub(r"\\" + name + r"(?![A-Za-z])", "", s)

    # сортировка по длине: иначе \R съест начало \Rarr, а \mbg -- начало \mbgeq
    for macro, repl in sorted(SIMPLE_MACROS.items(), key=lambda kv: -len(kv[0])):
        s = re.sub(re.escape(macro) + r"(?![A-Za-z])", lambda _m, r=repl: r, s)

    if not is_math:
        # вне формул \\ это перевод строки, а не LaTeX-команда
        s = s.replace("\\\\", "\n")
        s = re.sub(r"\\begin\{center\}|\\end\{center\}", "\n", s)
        s = re.sub(r"\\(?:begin|end)\{(?:itemize|enumerate|description)\}", "\n", s)
        s = re.sub(r"\\item\s*", "\n- ", s)
    return s


MATH_PATTERNS = [
    (r"\$\$", r"\$\$", "$$", "$$"),
    (r"\\\[", r"\\\]", "$$", "$$"),
    (r"\\\(", r"\\\)", "$", "$"),
    (r"\$", r"\$", "$", "$"),
]
_MATH_ENVS = ("equation", "equation*", "align", "align*", "gather", "gather*",
              "multline", "multline*", "cases", "array", "aligned", "al", "sqcases")
_BEGIN_ENV_RE = re.compile(r"\\begin\{([A-Za-z*]+)\}")


def _match_env(s, i):
    """
    Находит окружение, начинающееся в позиции i, с учётом ВЛОЖЕННОСТИ.
    Прежняя ленивая регулярка .*? останавливалась на первом \\end{...}, поэтому
    \\begin{align*}...\\begin{cases}...\\end{cases}...\\end{align*} обрезался
    на \\end{cases} -- формула уезжала в текст и ломала рендер.
    """
    m = _BEGIN_ENV_RE.match(s, i)
    if not m or m.group(1) not in _MATH_ENVS:
        return None
    name = m.group(1)
    depth, j = 0, i
    token = re.compile(r"\\(begin|end)\{" + re.escape(name) + r"\}")
    while j < len(s):
        t = token.search(s, j)
        if not t:
            return None
        depth += 1 if t.group(1) == "begin" else -1
        j = t.end()
        if depth == 0:
            return j
    return None


def _find_close(s, start, delim):
    """
    Ищет закрывающий делимитер на НУЛЕВОЙ глубине скобок.

    Зачем: в исходниках попадается вполне легальное
        $a=\\dfrac{...}{m_1+4m_2}g \\approx 0,22\\text{ м/с$^2$}$
    -- внутри \\text{} снова открывается математика. Наивный поиск следующего $
    находил тот, что внутри \\text{}, и формула обрывалась на середине
    ("...}{m_1+4"), после чего KaTeX падал.
    """
    i, n, dl = start, len(s), len(delim)
    depth = 0
    while i < n:
        ch = s[i]
        if ch == "\\" and i + 1 < n:        # \$ \{ \} \\ -- экранированное, пропускаем
            i += 2
            continue
        if ch == "{":
            depth += 1
            i += 1
            continue
        if ch == "}":
            depth -= 1
            i += 1
            continue
        if depth <= 0 and s.startswith(delim, i):
            return i
        i += 1
    return -1


def _strip_inner_math(s):
    """
    Убирает $ и $$ внутри математического окружения на нулевой глубине.

    Авторы иногда пишут $$...$$ прямо внутри \\begin{cases} (например физика №26):
        \\begin{equation*}\\begin{cases}$$m\\vec{g}+...=m\\vec{a_1}$$\\\\ ...
    Это невалидный LaTeX (математика внутри математики), KaTeX падает.
    Внутри \\text{...} (глубина > 0) $ оставляем -- там он законен.
    """
    out, depth, i, n = [], 0, 0, len(s)
    while i < n:
        ch = s[i]
        if ch == "\\" and i + 1 < n:
            out.append(s[i:i + 2])
            i += 2
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        if depth <= 0 and s.startswith("$$", i):
            i += 2
            continue
        if depth <= 0 and ch == "$":
            i += 1
            continue
        out.append(ch)
        i += 1
    return "".join(out)


def split_math(s):
    """Режет строку на сегменты (is_math, open, content, close)."""
    segments = []
    i = 0
    n = len(s)
    while i < n:
        # ищем ближайшее открытие математики
        best = None
        for op, cl, o_out, c_out in MATH_PATTERNS:
            m = re.compile(op).search(s, i)
            if m and (best is None or m.start() < best[0].start()):
                best = (m, cl, o_out, c_out)
        # ближайшее математическое окружение вне $...$
        env_start = env_end = None
        for em in _BEGIN_ENV_RE.finditer(s, i):
            end = _match_env(s, em.start())
            if end:
                env_start, env_end = em.start(), end
                break
        if env_start is not None and (best is None or env_start < best[0].start()):
            if env_start > i:
                segments.append((False, "", s[i:env_start], ""))
            # окружение уже само математика -- вложенные $ / $$ внутри невалидны
            segments.append((True, "$$", _strip_inner_math(s[env_start:env_end]), "$$"))
            i = env_end
            continue
        if best is None:
            segments.append((False, "", s[i:], ""))
            break
        m, cl, o_out, c_out = best
        if m.start() > i:
            segments.append((False, "", s[i:m.start()], ""))
        # закрывающий делимитер ищем с учётом глубины скобок, иначе $ внутри
        # \text{...} обрывает формулу на середине
        raw_delim = {r"\$\$": "$$", r"\\\]": "\\]", r"\\\)": "\\)", r"\$": "$"}[cl]
        pos = _find_close(s, m.end(), raw_delim)
        if pos == -1:
            segments.append((False, "", s[m.start():], ""))
            break
        segments.append((True, o_out, s[m.end():pos], c_out))
        i = pos + len(raw_delim)
    return segments


def tex_to_output(body, session_id):
    """Тело .tex -> (latex, plain_text, images, warnings)."""
    warnings = []
    for key, msg in UNSUPPORTED.items():
        if key.lstrip("\\") in body:
            warnings.append(msg)

    # 1. КОД вырезаем ПЕРВЫМ делом -- до чистки комментариев (в коде бывают %)
    #    и до нормализации пробелов (в питоне отступ = синтаксис).
    body, codes = extract_code_blocks(body)

    # 2. вынимаем чертежи, подменяя плейсхолдером
    images = []

    def _fig(name):
        if not re.search(r"\.(png|jpg|jpeg|svg|pdf)$", name, re.I):
            name += ".png"          # в .tex расширение часто опущено: {2} -> 2.png
        images.append(f"{LATEX_API}/{session_id}/{name}")
        return f"\n[FIG_{len(images) - 1}]\n"

    body = replace_figures(body, _fig)

    # 3. комментарии LaTeX (% ...), но не \%
    body = re.sub(r"(?<!\\)%.*", "", body)

    # 4. таблицы -> Markdown (до разбора математики: в ячейках остаётся $..$)
    body = convert_tabulars(body)

    # 5. разворачиваем макросы отдельно в тексте и в формулах
    latex_parts, text_parts = [], []
    for is_math, op, content, cl in split_math(body):
        content = expand_macros(content, is_math)
        if is_math:
            inner = " ".join(content.split())
            if not inner:
                continue          # у авторов бывает пустая $$...$$ -- не тащим её в вывод
            latex_parts.append(f"{op}{inner}{cl}")
            text_parts.append(f" {inner} ")
        else:
            latex_parts.append(content)
            text_parts.append(content)

    latex = _tidy("".join(latex_parts))
    text = _tidy_plain("".join(text_parts))

    # 6. код возвращаем ПОСЛЕ нормализации -- дословно
    latex = restore_code_blocks(latex, codes, fenced=True)
    text = restore_code_blocks(text, codes, fenced=False)
    if codes:
        warnings = warnings                       # код сохранён, предупреждать не о чем
    return latex, text, images, warnings


def _tidy(s):
    s = s.replace("\r", "")
    s = re.sub(r"[^\S\n]+", " ", s)               # пробелы/табы, но не переводы строк
    s = re.sub(r" *\n *", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def _tidy_plain(s):
    s = re.sub(r"\\[A-Za-z]+\s*", " ", s)      # для plain-версии срезаем команды
    s = re.sub(r"[{}$]", " ", s)
    s = re.sub(r"[^\S\n]+", " ", s)
    return s.strip()


# ============================================================================
#  4. HTML-КОНТЕНТ  (русский и прочая вёрстка)  -- новое
# ============================================================================

_HL_RE = re.compile(r"background(?:-color)?\s*:\s*([^;]+)", re.I)


def html_to_markdown(html_content):
    """
    HTML-вёрстка -> Markdown с СОХРАНЕНИЕМ смысла.

    Для русского это критично: <u> встречается 664 раза, <strong> 1226, <em> 621,
    <span style="background-color:..."> 668. Подчёркивания и выделения -- часть
    условия (выделенные морфемы, слова для разбора, подсветка в разборе), плоский
    текст их терял.
    """
    soup = BeautifulSoup(html_content, "lxml")
    for junk in soup(["script", "style"]):
        junk.decompose()
    for c in soup.find_all(string=lambda x: isinstance(x, Comment)):
        c.extract()

    images = []

    def render(node):
        out = []
        for el in node.children:
            if isinstance(el, NavigableString):
                out.append(str(el))
                continue
            name = el.name
            inner = render(el)
            stripped = inner.strip()
            if name in ("strong", "b"):
                out.append(f"**{stripped}**" if stripped else "")
            elif name in ("em", "i"):
                out.append(f"*{stripped}*" if stripped else "")
            elif name == "u":
                # в Markdown нет подчёркивания -- оставляем инлайн-HTML,
                # его понимают и MarkdownIt, и react-markdown с rehype-raw
                out.append(f"<u>{stripped}</u>" if stripped else "")
            elif name in ("s", "strike", "del"):
                out.append(f"~~{stripped}~~" if stripped else "")
            elif name == "sup":
                out.append(f"<sup>{stripped}</sup>")
            elif name == "sub":
                out.append(f"<sub>{stripped}</sub>")
            elif name == "br":
                out.append("\n")
            elif name == "img":
                src = el.get("src") or ""
                if src:
                    images.append(src if src.startswith("http") else BASE + src)
                    out.append(f"\n[FIG_{len(images) - 1}]\n")
            elif name == "a":
                href = el.get("href") or ""
                out.append(f"[{stripped}]({href})" if href else stripped)
            elif name == "li":
                out.append(f"\n- {stripped}")
            elif name in ("ul", "ol"):
                out.append("\n" + inner + "\n")
            elif name == "table":
                out.append("\n" + _html_table_to_md(el) + "\n")
            elif name in ("p", "div", "h1", "h2", "h3", "h4", "blockquote"):
                out.append("\n\n" + inner.strip() + "\n\n")
            elif name == "span":
                style = el.get("style") or ""
                hl = _HL_RE.search(style)
                # подсветка фоном несёт смысл (выделение в разборе) -> <mark>
                if hl and "transparent" not in hl.group(1).lower() and stripped:
                    out.append(f"<mark>{stripped}</mark>")
                else:
                    out.append(inner)
            else:
                out.append(inner)
        return "".join(out)

    md = render(soup.body or soup)
    md = html_module.unescape(md).replace("\xa0", " ")
    md = _tidy(md)
    # приводим делимитеры к единому виду со всеми остальными предметами
    md = md.replace(r"\(", "$").replace(r"\)", "$")
    md = md.replace(r"\[", "$$").replace(r"\]", "$$")
    return md, images


def _html_table_to_md(table):
    rows = []
    for tr in table.find_all("tr"):
        cells = []
        for td in tr.find_all(["td", "th"]):
            cells.append(" ".join(td.get_text(" ", strip=True).split()).replace("|", r"\|"))
        if cells:
            rows.append(cells)
    if not rows:
        return ""
    width = max(len(r) for r in rows)
    rows = [r + [""] * (width - len(r)) for r in rows]
    out = ["| " + " | ".join(rows[0]) + " |", "|" + "|".join(["---"] * width) + "|"]
    for r in rows[1:]:
        out.append("| " + " | ".join(r) + " |")
    return "\n".join(out)


def markdown_to_plain(md):
    s = re.sub(r"```.*?```", " ", md, flags=re.S)
    s = re.sub(r"<[^>]+>", "", s)
    s = re.sub(r"[*_`#>]", "", s)
    s = re.sub(r"\[FIG_\d+\]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


# ============================================================================
#  5. ФОЛБЭК: РАЗБОР ОТРЕНДЕРЕННОГО HTML  (только если .tex недоступен)
# ============================================================================

def html_to_output(html_content, session_id):
    """
    Аккуратный разбор старого HTML с SVG-формулами.

    Что здесь исправлено против самой первой версии:
      * ловим class="math" И class="math-display" (выключные формулы, ~20% математики)
      * ловим картинки БЕЗ класса -- это реальные чертежи (B_18_2_7.png), раньше терялись
      * HTML-комментарии <!-- l. 160 --> выкидываем через класс Comment.
        bs4 делает Comment подклассом str, поэтому isinstance(el, str) их пропускал --
        отсюда и брался мусор 'l. 160', который потом вычищали регуляркой.
    """
    soup = BeautifulSoup(html_content, "lxml")
    for junk in soup(["script", "style"]):
        junk.decompose()
    for c in soup.find_all(string=lambda x: isinstance(x, Comment)):
        c.extract()

    latex_parts, text_parts, images = [], [], []

    def walk(node):
        for el in node.children:
            name = getattr(el, "name", None)
            if name == "img":
                classes = el.get("class") or []
                alt = html_module.unescape(el.get("alt") or "")
                src = el.get("src") or ""
                if "math-display" in classes or "math" in classes:
                    formula = " ".join(alt.split())
                    if formula:
                        wrap = "$$" if "math-display" in classes else "$"
                        latex_parts.append(f" {wrap}{formula}{wrap} ")
                        text_parts.append(f" {formula} ")
                else:
                    # без класса -> настоящий чертёж
                    if src:
                        images.append(_abs_asset(src, session_id))
                        latex_parts.append(f"\n[FIG_{len(images) - 1}]\n")
                        text_parts.append(" [рисунок] ")
            elif name in ("br",):
                latex_parts.append("\n")
                text_parts.append(" ")
            elif name in ("p", "div", "center", "tr"):
                walk(el)
                latex_parts.append("\n")
                text_parts.append(" ")
            elif name is None:
                s = str(el)
                if s.strip():
                    latex_parts.append(s)
                    text_parts.append(s)
            else:
                walk(el)

    walk(soup.body or soup)
    latex = _tidy("".join(latex_parts))
    text = re.sub(r"\s+", " ", "".join(text_parts)).strip()
    return latex, text, images


def _abs_asset(src, session_id):
    if src.startswith("http"):
        return src
    if src.startswith("/"):
        return BASE + src
    return f"{LATEX_API}/{session_id}/{src}"


# ============================================================================
#  6. ЕДИНОЕ ИЗВЛЕЧЕНИЕ БЛОКА
# ============================================================================

class TexSource:
    """Качает и кэширует index.tex по session_id."""

    def __init__(self, client, cache_dir=TEX_CACHE_DIR, concurrency=MAX_CONCURRENCY):
        self.client = client
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(exist_ok=True)
        self.sem = asyncio.Semaphore(concurrency)
        self.memory = {}
        self.misses = set()

    async def body(self, session_id):
        sid = str(session_id)
        if sid in self.memory:
            return self.memory[sid]
        if sid in self.misses:
            return None

        path = self.cache_dir / f"{sid}.tex"
        if path.exists():
            tex = path.read_text(encoding="utf-8")
        else:
            tex = await self._download(sid)
            if tex is None:
                self.misses.add(sid)
                return None
            path.write_text(tex, encoding="utf-8")

        m = DOC_BODY_RE.search(tex)
        body = m.group(1) if m else None
        if body is None:
            self.misses.add(sid)
            return None
        self.memory[sid] = body
        return body

    async def _download(self, sid):
        url = f"{LATEX_API}/{sid}/index.tex"
        async with self.sem:
            for attempt in range(RETRIES):
                try:
                    r = await self.client.get(url)
                    if r.status_code == 404:
                        return None
                    r.raise_for_status()
                    if "tex" not in r.headers.get("content-type", "") and \
                       "\\begin{document}" not in r.text:
                        return None
                    return r.text
                except Exception:
                    if attempt == RETRIES - 1:
                        return None
                    await asyncio.sleep(1.5 * (attempt + 1))
        return None


EMPTY_BLOCK = {"source": "empty", "latex": "", "text": "", "images": [], "warnings": []}


def _block(source, sid, latex, text, images, warnings=None, html=None):
    b = {"source": source, "session_id": int(sid) if sid else None,
         "latex": latex, "text": text, "images": images or [],
         "warnings": warnings or []}
    if html is not None:
        b["html"] = html
    return b


async def extract_block(session_id, sessions_map, tex_source, session=None):
    """
    Четыре стратегии. Ветвимся по IsHtml -- это настоящий признак формата:

      IsHtml=true,  IsMathJax=true   -> mathjax : текст с \\( \\), готов
      IsHtml=true,  IsMathJax=false  -> html    : вёрстка -> Markdown (РУССКИЙ)
      IsHtml=false                   -> tex     : тянем index.tex (главный путь)
      IsHtml=false и .tex не отдался -> html_fallback : формулы из alt SVG

    Для IsHtml=true в latex-сервис не ходим совсем -- там гарантированный 404.
    `session` позволяет передать сессию напрямую (нужно для общего текста
    русского, который лежит вложенным объектом, а не в TexSessionsMap).
    """
    if session is None:
        if not session_id:
            return None
        session = sessions_map.get(str(session_id))
    if not session:
        return None
    sid = str(session_id or session.get("Id") or "")

    raw_html = session.get("Html") or ""
    if not raw_html.strip():
        return dict(EMPTY_BLOCK, session_id=int(sid) if sid.isdigit() else None)

    if session.get("IsHtml"):
        if session.get("IsMathJax"):
            md, images = html_to_markdown(raw_html)
            return _block("mathjax", sid, md, markdown_to_plain(md), images)
        md, images = html_to_markdown(raw_html)
        return _block("html", sid, md, markdown_to_plain(md), images,
                      html=raw_html.strip())

    body = await tex_source.body(sid)
    if body:
        latex, text, images, warns = tex_to_output(body, sid)
        if latex:
            return _block("tex", sid, latex, text, images, warns)

    latex, text, images = html_to_output(raw_html, sid)
    return _block("html_fallback", sid, latex, text, images,
                  ["формулы взяты из alt SVG -- .tex недоступен"])


# ============================================================================
#  7. ВЛОЖЕНИЯ, ОБЩИЙ ТЕКСТ, ОТВЕТЫ  -- новое
# ============================================================================

def resolve_files(ids, files_dep):
    """
    QuestionFiles у задачи -- список ID; сами файлы в dependencies.QuestionFiles.
    Рабочий URL только через /api/storage (прямой /st/... отдаёт 503).
    В теме 27 информатики это входные данные (27_2_A.txt / .xlsx) -- без них
    задача нерешаема.
    """
    out = []
    for fid in ids or []:
        info = files_dep.get(str(fid)) or {}
        src = info.get("LocationOriginalSrc") or ""
        if not src:
            continue
        out.append({
            "id": fid,
            "filename": info.get("OriginalFilename") or src.rsplit("/", 1)[-1],
            "url": STORAGE_API + src if src.startswith("/") else src,
        })
    return out


async def extract_shared_text(item, deps, tex_source):
    """
    Общий текст задания (русский, задания 1-3 и 22-26 по тексту).
    Лежит в dependencies.QuestionContent[id] с ВЛОЖЕННЫМ объектом TexSession,
    цепляется по RelatesToQuestionContentId. Без него условие вида
    "подберите союз на месте пропуска в первом (1) абзаце" бессмысленно.
    """
    cid = item.get("RelatesToQuestionContentId")
    if not cid:
        return None
    qc = (deps.get("QuestionContent") or {}).get(str(cid))
    if not qc:
        return None
    session = qc.get("TexSession") or None
    block = None
    if session:
        block = await extract_block(qc.get("TexSessionId"), {}, tex_source, session=session)
    elif qc.get("TexSessionId"):
        block = await extract_block(qc["TexSessionId"], {}, tex_source)
    if not block:
        return None
    block["content_id"] = cid
    block["name"] = qc.get("Name")
    return block


def split_answer_lines(text):
    """
    Answer.text бывает многострочным, и смысл строк ЗАВИСИТ ОТ ПРЕДМЕТА -- поэтому
    поле называется нейтрально answer_lines, а не "варианты":

      русский, задание 1:  "НО\\nОДНАКО\\nДА\\nА\\nТЕМНЕМЕНЕЕ"
          -> 5 ВЗАИМОЗАМЕНЯЕМЫХ вариантов, любой считается верным;

      информатика, задание 27:  "-9,402\\n-19,-93"
          -> ПОСЛЕДОВАТЕЛЬНЫЕ части одного ответа (для файла А и для файла Б),
             нужны обе.

    Различить их можно по answer_type_id / input_type (у инф. 27 это 21 и 3/4),
    так что логику проверки ответа строй на нём, а не на количестве строк.
    """
    if not text:
        return []
    parts = [p.strip() for p in re.split(r"[\r\n]+", text)]
    return [p for p in parts if p]


# ============================================================================
#  8. СБОР ЗАДАЧ
# ============================================================================

def get_next_data(html_text):
    soup = BeautifulSoup(html_text, "lxml")
    # у сайта тег с доп. атрибутом crossorigin, поэтому ищем по id, а не по строгому шаблону
    tag = soup.find("script", id="__NEXT_DATA__")
    if not tag or not tag.string:
        return None, soup
    try:
        return json.loads(tag.string), soup
    except json.JSONDecodeError:
        return None, soup


def get_sessions_map(dependencies):
    smap = dependencies.get("TexSessionsMap") or {}
    if not smap and dependencies.get("TexSessions"):
        smap = {str(s["Id"]): s for s in dependencies["TexSessions"]}
    return smap


def _names(ids, dep, key="Name"):
    out = []
    for i in ids or []:
        rec = (dep or {}).get(str(i)) or {}
        val = rec.get(key)
        if val:
            out.append(val)
    return out


async def build_task(item, sessions_map, tex_source, deps=None):
    deps = deps or {}
    answer = item.get("Answer") or {}
    blocks = await asyncio.gather(
        extract_block(item.get("QuestionTexSessionId"), sessions_map, tex_source),
        extract_block(item.get("SolutionTexSessionId"), sessions_map, tex_source),
        extract_block(answer.get("TexSessionId"), sessions_map, tex_source),
        extract_block(item.get("SolutionPlanTexSessionId"), sessions_map, tex_source),
        extract_block(item.get("GradeCriteriaTexSessionId"), sessions_map, tex_source),
        extract_shared_text(item, deps, tex_source),
    )
    condition, solution, ans_block, plan, criteria, shared = blocks

    answer_text = (answer.get("text") or "").strip() or None
    answer_lines = split_answer_lines(answer_text)
    # ответ бывает либо LaTeX-сессией, либо простой строкой -- сводим к одному блоку
    if ans_block is None and answer_text:
        ans_block = _block("text", None, answer_text, answer_text, [])

    hidden = item.get("AnswerHiddenTill") or {}
    files_dep = deps.get("QuestionFiles") or {}
    attachments = resolve_files(item.get("QuestionFiles"), files_dep)
    solution_files = resolve_files(item.get("SolutionFiles"), files_dep)

    return {
        "id": item.get("Id"),
        "name": item.get("Name"),
        "url": f"{BASE}/catalog/{item.get('Id')}",
        "shared_text": shared,               # общий текст (русский)
        "condition": condition,
        "solution": solution,
        "answer": ans_block,
        "answer_text": answer_text,
        "answer_lines": answer_lines,        # смысл строк зависит от предмета,
                                             # см. комментарий в split_answer_lines
        "solution_plan": plan,
        "grade_criteria": criteria,
        "attachments": attachments,          # файлы к заданию (информатика)
        "solution_files": solution_files,
        "answer_type_id": item.get("AnswerTypeId"),
        "input_type": item.get("InputType"),
        "difficulty_id": item.get("DifficultyId"),
        "answer_is_proof": item.get("AnswerIsProof"),
        "answer_needs_attachment": item.get("AnswerNeedsAttachment"),
        "answer_hidden": bool(hidden.get("Valid")),
        "is_ege": item.get("IsEGE"),
        "tags": item.get("Tags") or [],
        "tag_names": _names(item.get("Tags"), deps.get("Tags")),
        "themes": item.get("Themes") or [],
        "theme_names": _names(item.get("Themes"), deps.get("Themes")),
        "sources": _names(item.get("Sources"), deps.get("QuestionSources"), key="Source"),
        "lesson_id": item.get("LessonId") or None,
        "created_at": item.get("CreatedAt"),
        "updated_at": item.get("UpdatedAt"),
    }


class AntiBotError(RuntimeError):
    """Сайт вернул JS-проверку вместо страницы."""


def looks_like_antibot(text):
    return ("не смог пройти проверку" in text
            or "включите в настройках вашего веб-браузера поддержку JavaScript" in text)


async def fetch_page(client, url):
    for attempt in range(RETRIES):
        try:
            r = await client.get(url)
            # 503 + JS-челлендж: молча ломать цикл нельзя, иначе тихо получим 0 задач
            if r.status_code == 503 and looks_like_antibot(r.text):
                raise AntiBotError(
                    "Сайт отдал JS-проверку (503) вместо страницы.\n"
                    "   Каталог закрыт антибот-защитой для этого IP.\n"
                    "   Варианты: запускать с домашнего IP, либо передать cookies из браузера --\n"
                    "   COOKIES = {...} в конфиге (F12 -> Application -> Cookies), либо снизить темп."
                )
            r.raise_for_status()
            return r.text
        except AntiBotError:
            raise
        except Exception:
            if attempt == RETRIES - 1:
                return None
            await asyncio.sleep(2 * (attempt + 1))
    return None


async def download_attachments(client, tasks):
    """Качает файлы задач в ATTACH_DIR (включается флагом DOWNLOAD_ATTACHMENTS)."""
    ATTACH_DIR.mkdir(exist_ok=True)
    sem = asyncio.Semaphore(MAX_CONCURRENCY)

    async def one(att):
        path = ATTACH_DIR / f"{att['id']}_{att['filename']}"
        if path.exists():
            att["local_path"] = str(path)
            return
        async with sem:
            try:
                r = await client.get(att["url"])
                if r.status_code == 200:
                    path.write_bytes(r.content)
                    att["local_path"] = str(path)
            except Exception:
                pass

    jobs = [one(a) for t in tasks for a in (t.get("attachments") or [])]
    if jobs:
        await asyncio.gather(*jobs)


async def fetch_tasks():
    with open(SUBTHEMES_FILE, encoding="utf-8") as f:
        data = json.load(f)

    try:
        with open(OUTPUT_FILE, encoding="utf-8") as f:
            all_tasks = json.load(f)
        print("Найден файл прогресса, продолжаем.")
    except (FileNotFoundError, json.JSONDecodeError):
        all_tasks = {}

    stats = {}

    async with httpx.AsyncClient(headers=HEADERS, cookies=COOKIES, timeout=40.0,
                                 follow_redirects=True) as client:
        tex_source = TexSource(client)

        for subject, subthemes in data.items():
            print(f"\n--- Предмет: {subject} ---")
            all_tasks.setdefault(subject, {})

            for subtheme_name, url in subthemes.items():
                seen = set()
                tasks = []
                theme_name, parent_name = "Общая тема", None
                page, total_pages = 1, None

                while True:
                    sep = "&" if "?" in url else "?"
                    text = await fetch_page(client, f"{url}{sep}Page={page}")
                    if not text:
                        break

                    nd, _soup = get_next_data(text)
                    if not nd:
                        break
                    try:
                        pp = nd["props"]["pageProps"]
                        ql = pp["questionList"]
                    except (KeyError, TypeError):
                        break

                    # имя темы берём из JSON, а не из хрупкого CSS-класса
                    if pp.get("currentTheme"):
                        theme_name = (pp["currentTheme"].get("Name") or theme_name).strip()
                    if pp.get("parentTheme") and pp["parentTheme"].get("Name"):
                        parent_name = pp["parentTheme"]["Name"].strip()

                    # пагинация из JSON вместо кручения до пустой страницы
                    if total_pages is None:
                        pag = pp.get("pagination") or {}
                        total_pages = pag.get("TotalPages") or 1

                    deps = ql.get("dependencies") or {}
                    sessions_map = get_sessions_map(deps)
                    items = [q for q in (ql.get("questions") or [])
                             if q.get("Id") and q["Id"] not in seen]
                    for q in items:
                        seen.add(q["Id"])

                    built = await asyncio.gather(*[
                        build_task(q, sessions_map, tex_source, deps) for q in items
                    ])
                    tasks.extend(built)

                    for t in built:
                        for key in ("condition", "solution", "answer", "shared_text",
                                    "solution_plan", "grade_criteria"):
                            b = t.get(key)
                            if b:
                                stats[b["source"]] = stats.get(b["source"], 0) + 1

                    if page >= total_pages:
                        break
                    page += 1
                    await asyncio.sleep(PAGE_DELAY)

                if DOWNLOAD_ATTACHMENTS:
                    await download_attachments(client, tasks)

                group = parent_name or theme_name
                all_tasks[subject].setdefault(group, {})
                all_tasks[subject][group][subtheme_name] = {
                    "theme": theme_name,
                    "url": url,
                    "count": len(tasks),
                    "tasks": tasks,
                }
                n_att = sum(len(t.get("attachments") or []) for t in tasks)
                extra = f", файлов {n_att}" if n_att else ""
                print(f"  [+] {len(tasks):3d} задач{extra} | {subtheme_name}")

                with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                    json.dump(all_tasks, f, ensure_ascii=False, indent=2)

    print(f"\nГотово. Блоки по источникам: {stats}")
    print(f"Результат: {OUTPUT_FILE}")


# ============================================================================
#  9. ПРОГОН НА ЛОКАЛЬНОМ ФАЙЛЕ  (для проверки)
# ============================================================================

async def parse_local(path, limit=None):
    nd, _ = get_next_data(Path(path).read_text(encoding="utf-8"))
    pp = nd["props"]["pageProps"]
    ql = pp["questionList"]
    deps = ql.get("dependencies") or {}
    sessions_map = get_sessions_map(deps)
    items = ql.get("questions") or []
    if limit:
        items = items[:limit]

    async with httpx.AsyncClient(headers=HEADERS, cookies=COOKIES, timeout=40.0,
                                 follow_redirects=True) as client:
        tex_source = TexSource(client)
        return await asyncio.gather(*[
            build_task(q, sessions_map, tex_source, deps) for q in items
        ]), pp


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "subthemes":
        asyncio.run(fetch_subthemes())
    elif len(sys.argv) > 2 and sys.argv[1] == "local":
        tasks, pp = asyncio.run(parse_local(sys.argv[2]))
        print(json.dumps(tasks, ensure_ascii=False, indent=2)[:4000])
    else:
        asyncio.run(fetch_tasks())