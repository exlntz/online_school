import { Flame, Target, Trophy } from "lucide-react";


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
