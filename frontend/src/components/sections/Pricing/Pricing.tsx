import { Leaf } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
      <div className={styles.inner}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`${styles.header} ${styles.reveal}`}
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
        <div
          ref={gridRef}
          className={`${styles.grid} ${styles.reveal} ${styles.delay200}`}
        >
          {tiers.map(t => (
            <div
              key={t.tier}
              className={`${styles.cardWrap} ${t.featured ? styles.cardWrapFeatured : ''}`}
            >
              <div className={`${styles.card} ${t.featured ? styles.cardFeatured : ''}`}>
                <Leaf
                  size={24}
                  className={`${styles.cardLeaf} ${t.featured ? styles.cardLeafFeatured : ''}`}
                  aria-hidden="true"
                />
                {t.badge && (
                  <span className={styles.cardBadge}>{t.badge}</span>
                )}
                <p className={`${styles.cardTier} ${t.featured ? styles.cardTierFeatured : ''}`}>{t.tier}</p>
                <h3 className={`${styles.cardName} ${t.featured ? styles.cardNameFeatured : ''}`}>{t.name}</h3>
                <p className={`${styles.cardDuration} ${t.featured ? styles.cardDurationFeatured : ''}`}>{t.duration}</p>
                <p className={`${styles.cardLabel} ${t.featured ? styles.cardLabelFeatured : ''}`}>{t.label}</p>
                <div className={`${styles.separator} ${t.featured ? styles.separatorFeatured : ''}`}></div>
                <ul className={styles.featureList}>
                  {t.features.map(f => (
                    <li key={f} className={styles.featureItem}>
                      <Leaf size={14} className={`${styles.featureIcon} ${t.featured ? styles.featureIconFeatured : ''}`} />
                      <span className={`${styles.featureText} ${t.featured ? styles.featureTextFeatured : ''}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.cardBtn}>
                  <Link to="/pricing" className={`${styles.btn} ${t.featured ? styles.btnFeatured : ''}`}>
                    Выбрать
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div
          ref={trustRef}
          className={`${styles.trust} ${styles.reveal} ${styles.delay400}`}
        >
          <div className={styles.trustSep}></div>
          <div className={styles.trustRow}>
            {trust.map(label => (
              <div key={label} className={styles.trustItem}>
                <span className={styles.trustLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
