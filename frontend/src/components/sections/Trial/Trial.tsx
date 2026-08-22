import { Phone } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { TRIAL_MARQUEE_WORDS } from '../../../data/home.data';
import { cn } from '../../../shared/lib';
import { Button, Divider, Marquee } from '../../../shared/ui';
import styles from './Trial.module.css';


export const Trial = (): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.visible);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="твой-тест-драйв" className={styles.section}>
      {/* Gradient overlay */}
      <div className={styles.gradient} aria-hidden="true"></div>

      {/* Main content */}
      <div
        ref={contentRef}
        className={cn(styles.content, styles.reveal)}
      >
        <div className={styles.eyebrowRow}>
          <Divider variant='primary' className={styles.eyebrowLine} />
          <span className={styles.eyebrow}>06 / Пробная неделя</span>
          <Divider variant='primary' className={styles.eyebrowLine} />
        </div>

        <h2 className={styles.heading}>
          <span className={styles.headingLine}>Твой</span>
          <span className={styles.headingLine}>Тест</span>
          <span className={styles.headingLine}>
            Драйв<span className={styles.headingDot}>.</span>
          </span>
        </h2>

        <p className={styles.description}>
          Попробуй обучение в нашей школе бесплатно в течение 7 дней. Получи доступ к урокам, кураторам и геймификации уже сегодня.
        </p>

        <div className={styles.btnWrap}>
          <div className={styles.btnGlow} aria-hidden="true"></div>
          <Button 
            as="a" 
            href="#" 
            variant="primary" 
            size="xl" 
            radius={16}
            className={styles.btn}
          >
            Начать бесплатно
          </Button>
        </div>

        <p className={styles.phoneRow}>
          Или позвони{' '}
          <a href="tel:+78000000000" className={styles.phoneLink}>
            <Phone size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            8 (800) 000-00-00
          </a>
          <span className={styles.phoneDash}>—</span>
          Консультация
        </p>
      </div>

      {/* Bottom marquee strip */}
      <div className={styles.marqueeStrip}>
        <Marquee 
          items={TRIAL_MARQUEE_WORDS} 
          separator="/" 
          speed={65} 
          textClassName={styles.trialMarqueeText} 
          repeatMultiplier={6}
        />
      </div>
    </section>
  );
}
