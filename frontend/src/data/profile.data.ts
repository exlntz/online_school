import { BarChart3, BookOpen, Brain, Settings } from "lucide-react";

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