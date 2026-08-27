import { Flame, Target, Trophy } from "lucide-react";
import type { HomeworkModel } from "../../entities/homework";


// WeeklyActivity component
export const MOCK_DATA_WEEKLY_ACTIVITY = [
    { day: 'Пн', value: 0 },
    { day: 'Вт', value: 0 },
    { day: 'Ср', value: 40 },
    { day: 'Чт', value: 95 },
    { day: 'Пт', value: 100 },
    { day: 'Сб', value: 100 },
    { day: 'Вс', value: 100 },
];


// LearningHomePage component
export const MOCK_API_LESSON = {
    id: 'lesson-123',
    title: 'Геометрический смысл производной',
    moduleNumber: 4,
    moduleTopic: 'Начала анализа',
    lessonNumber: 18,
    lessonTotal: 26,
    duration: 25,
    isWebinar: true
};


// WidgetMetric component
export const MOCK_WIDGET_METRIC = [
    { id: 'streak', icon: Flame, label: 'Серия', value: '12 дней' },
    { id: 'tasks', icon: Target, label: 'Задач за неделю', value: '48' },
    { id: 'rating', icon: Trophy, label: 'Рейтинг', value: 'Топ 8%' },
];


// UpcomingLessons component
export const MOCK_UPCOMING_LESSONS = [
    { id: 'l2', title: 'Производная сложной функции', moduleNumber: 4, moduleTopic: 'Начала анализа', lessonNumber: 20, lessonTotal: 26, duration: 25 },
    { id: 'l3', title: 'Первообразная и интеграл', moduleNumber: 4, moduleTopic: 'Начала анализа', lessonNumber: 25, lessonTotal: 26, duration: 30 },
    { id: 'l4', title: 'Практикум: задание №11', moduleNumber: 4, moduleTopic: 'Начала анализа', lessonNumber: 26, lessonTotal: 26, duration: 40 },
];


// RepetionQuickPage component
export const MOCK_QUICK_REVIEW_CARDS = [
    {
        topic: 'Производная',
        fromMistake: true,
        front: 'Производная произведения функций',
        back: '(u·v)′ = u′·v + u·v′ — не забывайте второе слагаемое.',
    },
    {
        topic: 'Тригонометрия',
        fromMistake: true,
        front: 'Основное тригонометрическое тождество',
        back: 'sin²x + cos²x = 1, откуда 1 + tg²x = 1/cos²x.',
    },
    {
        topic: 'Логарифмы',
        fromMistake: false,
        front: 'Логарифм произведения',
        back: 'logₐ(xy) = logₐx + logₐy при x, y > 0.',
    },
    {
        topic: 'Планиметрия',
        fromMistake: true,
        front: 'Теорема синусов',
        back: 'a/sinA = b/sinB = c/sinC = 2R, где R — радиус описанной окружности.',
    },
];

// VariantsPage component
export const MOCK_VARIANTS = [
  {
    title: 'Пробный вариант ЕГЭ №14',
    meta: '18 заданий · профильный уровень',
    rated: true,
    status: 'assigned',
    deadline: 'до 20 июня',
  },
  {
    title: 'Тренировочный вариант №09',
    meta: '18 заданий · профильный уровень',
    rated: false,
    status: 'in-progress',
    deadline: '7 из 18 решено',
  },
  {
    title: 'Досрочный ЕГЭ 2024',
    meta: '18 заданий · официальный',
    rated: true,
    status: 'done',
    score: '82 балла',
    deadline: 'сдано 6 июня',
  },
  {
    title: 'Вариант по стереометрии',
    meta: '12 заданий · тематический',
    rated: false,
    status: 'assigned',
    deadline: 'до 22 июня',
  },
];

// TaskBankPage component
export const MOCK_TASK_BANK = [
  {
    number: '№7',
    title: 'Производная и первообразная',
    meta: '4 темы · 120 задач',
    topics: [
      { title: 'Физический смысл производной', total: 30, solved: 18 },
      { title: 'Наибольшее и наименьшее значение', total: 40, solved: 12 },
      { title: 'Первообразная функции', total: 25, solved: 0 },
      { title: 'Площадь криволинейной трапеции', total: 25, solved: 4 },
    ],
  },
  {
    number: '№11',
    title: 'Текстовые задачи',
    meta: '3 темы · 90 задач',
    topics: [
      { title: 'Задачи на движение', total: 35, solved: 20 },
      { title: 'Задачи на работу', total: 30, solved: 8 },
      { title: 'Задачи на смеси и сплавы', total: 25, solved: 0 },
    ],
  },
  {
    number: '№13',
    title: 'Тригонометрические уравнения',
    meta: '3 темы · 75 задач',
    topics: [
      { title: 'Простейшие уравнения', total: 30, solved: 30 },
      { title: 'Отбор корней на отрезке', total: 25, solved: 6 },
      { title: 'Однородные уравнения', total: 20, solved: 2 },
    ],
  },
  {
    number: '№18',
    title: 'Задачи с параметром',
    meta: '2 темы · 48 задач',
    topics: [
      { title: 'Графический метод', total: 24, solved: 3 },
      { title: 'Аналитический метод', total: 24, solved: 0 },
    ],
  },
];

// // HomeworkPage component
export const MOCK_HOMEWORK: HomeworkModel[] = [
    {
        title: 'Производная сложной функции',
        topic: 'Начала анализа · 8 задач',
        deadline: 'до 13 июня, 23:59',
        progress: 'Не начато',
        status: 'current',
    },
    {
        title: 'Тригонометрические уравнения',
        topic: 'Тригонометрия · 10 задач',
        deadline: 'до 15 июня, 23:59',
        progress: '3 из 10 решено',
        status: 'current',
    },
    {
        title: 'Стереометрия: сечения',
        topic: 'Геометрия · 6 задач',
        deadline: 'до 18 июня, 23:59',
        progress: 'Не начато',
        status: 'current',
    },
    {
        title: 'Показательные неравенства',
        topic: 'Алгебра · 9 задач',
        deadline: 'сдано 8 июня',
        progress: '9 из 9',
        status: 'done',
    },
    {
        title: 'Планиметрия: углы окружности',
        topic: 'Геометрия · 7 задач',
        deadline: 'дедлайн истёк 5 июня',
        progress: '2 из 7 решено',
        status: 'overdue',
    },
];

// SettingsPage component
export const MOCK_TIERS = [
    { id: 'basic', name: 'Базовый', price: '990 ₽/мес', features: '1 предмет · теория и ДЗ' },
    { id: 'pro', name: 'Профи', price: '2 490 ₽/мес', features: '3 предмета · пробники и психолог' },
    { id: 'premium', name: 'Премиум', price: '3 990 ₽/мес', features: 'Все предметы · личный наставник' },
];