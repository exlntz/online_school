import { Leaf } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { PricingCard } from '../../common';
import { Container, Divider } from '../../ui';
import styles from './Pricing.module.css';


const tiers = [
  {
    index: 0,
    tier: 'TIER 01 · START',
    name: 'Базовый уровень',
    duration: '3 МЕСЯЦА · ОНЛАЙН',
    label: 'Доступно',
    featured: false,
    features: ['Доступ к видеолекциям', 'Базовые домашние задания', 'Чат с наставником', 'Еженедельные тесты', 'Проверка ошибок'],
  },
  {
    index: 1,
    tier: 'TIER 02 · PRO',
    name: 'Интенсивный курс',
    duration: '6 МЕСЯЦЕВ · ОНЛАЙН',
    label: 'Популярно',
    featured: true,
    badge: 'ВЫБОР УЧЕНИКОВ',
    features: ['Все материалы базового', 'Личный куратор из МГУ', 'Разбор сложных задач', 'Индивидуальный план', 'Психологическая поддержка', 'Пробные ЕГЭ ежемесячно', 'Приоритетная поддержка'],
  },
  {
    index: 2,
    tier: 'TIER 03 · ELITE',
    name: 'Максимальный результат',
    duration: '9 МЕСЯЦЕВ · ОНЛАЙН',
    label: 'Премиум',
    featured: false,
    features: ['Полное сопровождение', 'Личный ментор 24/7', 'Помощь с поступлением', 'Профиль для родителей', 'Закрытые вебинары', 'Три пробных ЕГЭ в месяц'],
  },
];

const trust = ['ЛИЦЕНЗИЯ РФ', 'АВТОРСКИЕ МЕТОДИКИ', 'НАУЧНЫЙ ПОДХОД', 'ТОП-ВУЗЫ НАСТАВНИКИ'];

export const Pricing = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.visible);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    [headerRef, gridRef, trustRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="твой-план-подготовки" className={styles.section}>
      <Container>
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(styles.header, styles.reveal)}
        >
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>НАШИ ТАРИФЫ</p>
            <h2 className={styles.heading}>
              Три пути к <em className={styles.headingItalic}>сотне</em>.
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.subtext}>
              Независимо от вашего текущего уровня, наши программы разработаны как точная система подготовки — эффективная, технологичная и ориентированная на ваш успех.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div ref={gridRef} className={cn(styles.grid, styles.reveal, styles.delay200)}>
          {tiers.map(t => (
            <div key={t.tier} className={cn(styles.cardWrap, t.featured && styles.cardWrapFeatured)}>
              <PricingCard 
                layout="compact"
                colorTheme={t.featured ? 'primary' : 'default'}
                badgeText={t.badge}
                tier={t.tier}
                name={t.name}
                duration={t.duration}
                label={t.label}
                features={t.features}
                featureIcon={Leaf}
                actionButton={
                  <Link to="/pricing" className={cn(styles.btn, t.featured && styles.btnFeatured)}>
                    Выбрать
                  </Link>
                }
              />
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div
          ref={trustRef}
          className={cn(styles.trust, styles.reveal, styles.delay400)}
        >
          <Divider className={styles.trustDivider}/>
          <div className={styles.trustRow}>
            {trust.map(label => (
              <div key={label} className={styles.trustItem}>
                <span className={styles.trustLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
