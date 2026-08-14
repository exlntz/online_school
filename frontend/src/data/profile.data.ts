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
import type { NavItem } from "../types/menu";

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
  { id: 'home', href: '/profile/learning', label: 'Главная', icon: Home },
  { id: 'theory', href: '/profile/learning/theory', label: 'Теория', icon: BookOpen },
  { id: 'homework', href: '/profile/learning/homework', label: 'Домашнее задание', icon: ClipboardList, badge: 3 },
  { id: 'task-bank', href: '/profile/learning/task-bank', label: 'Банк заданий', icon: Layers },
  { id: 'practice', href: '/profile/learning/practice', label: 'Нарешка', icon: Zap },
  { id: 'variants', href: '/profile/learning/variants', label: 'Каталог вариантов', icon: FolderOpen },
  { id: 'quick-review', href: '/profile/learning/quick-review', label: 'Быстрое повторение', icon: Repeat },
];

export const SUBJECTS = [
    { id: 'math', label: 'Математика', icon: Sigma },
    { id: 'physics', label: 'Физика', icon: Atom },
    { id: 'informatics', label: 'Информатика', icon: Terminal },
    { id: 'russian', label: 'Русский язык', icon: BookOpen },
];