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
