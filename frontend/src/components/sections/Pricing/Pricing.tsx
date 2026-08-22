import { Leaf } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { PRICING_TIERS, PRICING_TRUST_BADGES } from '../../../data/home.data';
import { cn } from '../../../shared/lib';
import { Button, Container, Divider } from '../../../shared/ui';
import { PricingCard } from '../../common';
import styles from './Pricing.module.css';


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
          {PRICING_TIERS.map(t => (
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
                  <Button 
                    as={Link} 
                    to="/pricing" 
                    variant={t.featured ? 'secondary' : 'primary'} 
                    size="m" 
                    disableJump
                    className={styles.btn}
                  >
                    Выбрать
                  </Button>
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
            {PRICING_TRUST_BADGES.map(label => (
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
