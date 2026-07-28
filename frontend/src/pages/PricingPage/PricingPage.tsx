import { Plus } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Divider } from '../../components/ui';
import { cn } from '../../utils/cn';
import styles from './PricingPage.module.css';


const tiers = [
  {
    tier: 'ТАРИФ 01',
    name: 'БАЗОВЫЙ',
    sub: 'Для уверенного старта',
    price: '2990',
    unit: '₽/мес',
    featured: false,
    popular: false,
    features: [
      'Доступ к платформе 24/7',
      'Базовые видеоуроки по ЕГЭ',
      'Автоматическая проверка тестов',
      'Чат с наставником',
      'Доступ к базе знаний',
    ],
    btnText: 'Выбрать →',
    btnClass: 'outline',
  },
  {
    tier: 'ТАРИФ 02',
    name: 'ПРОДВИНУТЫЙ',
    sub: 'Для максимального результата',
    price: '4990',
    unit: '₽/мес',
    featured: true,
    popular: true,
    features: [
      'Все возможности Базового',
      'Личный куратор из топ-вуза',
      'Проверка домашних заданий',
      'Геймификация и кланы',
      'Анонимная поддержка психолога',
      'Родительский контроль',
    ],
    btnText: 'Выбрать — Популярно →',
    btnClass: 'primary',
  },
  {
    tier: 'ТАРИФ 03',
    name: 'ПРЕМИУМ',
    sub: 'Индивидуальный подход',
    price: '7990',
    unit: '₽/мес',
    featured: false,
    popular: false,
    features: [
      'Все возможности Продвинутого',
      'Индивидуальные созвоны',
      'Разбор сложных тем 1 на 1',
      'Помощь с поступлением',
      'Приоритетная поддержка',
      'Личный план подготовки',
      'Доступ к закрытым вебинарам',
    ],
    btnText: 'Выбрать →',
    btnClass: 'dark',
  },
];

export const PricingPage = (): JSX.Element => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.visible);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (heroRef.current) observer.observe(heroRef.current);
    cardsRef.current.forEach(c => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main>
        <section id="стоимость-обучения" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.noise} aria-hidden="true"></div>

            <div ref={heroRef} className={cn(styles.hero, styles.reveal)}>
              <p className={styles.eyebrow}>Тарифная сетка</p>
              <h2 className={styles.heading}>
                Три пути<br />
                к <em className={styles.headingEm}>сотне.</em>
              </h2>
              <p className={styles.sub}>
                Выберите интенсивность подготовки. Каждый ученик получает доступ к качественным материалам и поддержке наставников.
              </p>
            </div>

            <div className={styles.grid}>
              {tiers.map((t, i) => (
                <div
                  key={t.tier}
                  ref={el => { cardsRef.current[i] = el; }}
                  className={styles.reveal}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className={cn(styles.card, t.featured && styles.cardFeatured)}>
                    {t.popular && <Badge variant="primary" size="m" className={styles.popularBadgeWrap}>Популярно</Badge>}
                    <p className={styles.cardTier}>{t.tier}</p>
                    <h3 className={styles.cardName}>{t.name}</h3>
                    <p className={styles.cardSub}>{t.sub}</p>
                    <div className={styles.priceRow}>
                        <span className={styles.priceNum}>{t.price}</span>
                        <span className={styles.priceUnit}>{t.unit}</span>
                    </div>

                    <Divider className={styles.divider} />

                    <ul className={styles.featureList}>
                      {t.features.map(f => (
                        <li key={f} className={styles.featureItem}>
                          <Plus className={styles.featureIcon} aria-hidden="true" />
                          <span className={styles.featureText}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.cardFooter}>
                      <Link to="/register" className={cn(styles.btn, styles[`btn_${t.btnClass}`])}>
                          {t.btnText}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.footnote}>
              Все тарифы включают доступ к личному кабинету и прогресс-трекеру.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
