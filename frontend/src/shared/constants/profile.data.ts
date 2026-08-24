import {
  Atom,
  BarChart3,
  BookOpen,
  Brain,
  ClipboardList,
  FolderOpen, Home, Layers, Repeat,
  Settings,
  Sigma,
  Terminal,
  Zap
} from 'lucide-react';
import type { NavItem } from '../config';

export const PROFILE_DASHBOARD_CARDS = [
  {
    title: "Обучение",
    description: "Курсы, уроки и домашние задания",
    icon: BookOpen,
    href: "learning",
  },
  {
    title: "Психолог",
    description: "Поддержка, чат и упражнения для ума",
    icon: Brain,
    href: "psychologist",
  },
  {
    title: "Статистика",
    description: "Прогресс, оценки и аналитика",
    icon: BarChart3,
    href: "statistics",
  },
  {
    title: "Настройки",
    description: "Профиль и параметры аккаунта",
    icon: Settings,
    href: "settings",
  },
];


export const PROFILE_NAV_ITEMS: NavItem[] = [
  { 
    id: 'main', 
    href: '/profile/learning', 
    label: 'Главная', 
    icon: Home,
    description: 'Продолжайте с того места, где остановились. Сегодня отличный день, чтобы приблизиться к цели.'
  },
  { 
    id: 'theory', 
    href: '/profile/learning/theory', 
    label: 'Теория', 
    icon: BookOpen,
    description: 'Видеоуроки, конспекты и предстоящие трансляции по всем темам курса.'
  },
  { 
    id: 'homework', 
    href: '/profile/learning/homework', 
    label: 'Домашнее задание', 
    icon: ClipboardList, 
    description: 'Отслеживайте дедлайны и приступайте к заданиям в один клик.',
  },
  { 
    id: 'task-bank', 
    href: '/profile/learning/task-bank', 
    label: 'Банк заданий', 
    icon: Layers,
    description: 'Тренируйтесь по номерам заданий ЕГЭ. Выбирайте тему и нарабатывайте навык.' 
  },
  { 
    id: 'practice', 
    href: '/profile/learning/practice', 
    label: 'Нарешка', 
    icon: Zap,
    description: 'Режим непрерывного решения. Настройте фильтры и решайте задачи одну за другой.'
  },
  { 
    id: 'variants', 
    href: '/profile/learning/variants', 
    label: 'Каталог вариантов', 
    icon: FolderOpen,
    description: 'Назначенные варианты ЕГЭ. Рейтинговые влияют на ваше место в общем зачёте.' 
  },
  { 
    id: 'quick-review', 
    href: '/profile/learning/quick-review', 
    label: 'Быстрое повторение', 
    icon: Repeat,
    description: 'Умная лента фактов и формул на основе недавних тем и работы над ошибками.' 
  },
];

export const SUBJECTS = [
    { id: 'math', label: 'Математика', icon: Sigma },
    { id: 'physics', label: 'Физика', icon: Atom },
    { id: 'informatics', label: 'Информатика', icon: Terminal },
    { id: 'russian', label: 'Русский язык', icon: BookOpen },
];