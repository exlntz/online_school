import type { PracticeDifficulty, PracticeTopic } from "./types";

export const PRACTICE_TOPIC_TAGS: Record<string, PracticeTopic[]> = {
    math: [
        { topic: 'math_der', title: 'Производная' },
        { topic: 'math_trig', title: 'Тригонометрия' },
        { topic: 'math_plan', title: 'Планиметрия' },
        { topic: 'math_ster', title: 'Стереометрия' },
        { topic: 'math_param', title: 'Параметры' },
        { topic: 'math_text', title: 'Текстовые задачи' },
        { topic: 'math_prob', title: 'Вероятность' },
        { topic: 'math_log', title: 'Логарифмы' }
    ],
    physics: [
        { topic: 'phys_mech', title: 'Механика' },
        { topic: 'phys_mkt', title: 'МКТ и термодинамика' },
        { topic: 'phys_ed', title: 'Электродинамика' },
        { topic: 'phys_quant', title: 'Квантовая физика' },
        { topic: 'phys_opt', title: 'Оптика' },
        { topic: 'phys_nuc', title: 'Ядерная физика' }
    ],
    informatics: [
        { topic: 'inf_graph', title: 'Графы' },
        { topic: 'inf_bool', title: 'Алгебра логики' },
        { topic: 'inf_prog', title: 'Программирование' },
        { topic: 'inf_excel', title: 'Электронные таблицы' },
        { topic: 'inf_game', title: 'Теория игр' },
        { topic: 'inf_sys', title: 'Системы счисления' }
    ],
    russian: [
        { topic: 'rus_orf', title: 'Орфоэпия' },
        { topic: 'rus_punct', title: 'Пунктуация' },
        { topic: 'rus_synt', title: 'Синтаксис' },
        { topic: 'rus_cult', title: 'Культура речи' },
        { topic: 'rus_text', title: 'Работа с текстом' },
        { topic: 'rus_essay', title: 'Сочинение' }
    ]
};

export const PRACTICE_DIFFICULTY_TAGS: PracticeDifficulty[] = [
    { difficult: 0, title: 'Базовый'}, 
    { difficult: 1, title: 'Профильный'}, 
    { difficult: 2, title: 'Повышенный'}
];