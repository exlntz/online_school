import { Plus } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { PricingCard } from '../../../components/common';
import { PRICING_PAGE_TIERS } from '../../../data/pricing.data';
import { cn } from '../../../shared/lib';
import { Button } from '../../../shared/ui';
import styles from './PricingPage.module.css';


const getButtonVariant = (btnClass: string) => {
  switch (btnClass) {
    case 'outline': return 'outline-primary';
    case 'primary': return 'primary';
    case 'dark': return 'secondary';
    default: return 'primary'; 
  }
};

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

            {/* noise & hero */}
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
              {PRICING_PAGE_TIERS.map((t, i) => (
                <div
                  key={t.tier}
                  ref={el => { cardsRef.current[i] = el; }}
                  className={styles.reveal}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <PricingCard 
                    layout="detailed"
                    isLifted={t.featured}
                    badgeText={t.popular ? "Популярно" : undefined}
                    tier={t.tier}
                    name={t.name}
                    sub={t.sub}
                    price={t.price}
                    unit={t.unit}
                    features={t.features}
                    featureIcon={Plus}
                    actionButton={
                      <Button
                        as={Link}
                        to="/register"
                        variant={getButtonVariant(t.btnClass)}
                        size="m"
                        radius="1rem"
                        arrow="right"
                        className={styles.btn}
                        disableJump
                      >
                        Выбрать
                      </Button>
                    }
                  />
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
