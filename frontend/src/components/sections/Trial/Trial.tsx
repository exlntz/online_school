import { Phone } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import styles from './Trial.module.css';


const marqueeItems = ['7 ДНЕЙ БЕСПЛАТНО', 'ПОДГОТОВКА К ЕГЭ 2025', 'СТАРТ В ЛЮБОЙ МОМЕНТ'];

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
        className={`${styles.content} ${styles.reveal}`}
      >
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrowLine}></span>
          <span className={styles.eyebrow}>06 / Пробная неделя</span>
          <span className={styles.eyebrowLine}></span>
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
          <a href="#" className={styles.btn}>Начать бесплатно</a>
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
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeText}>{item}</span>
              <span className={styles.marqueeSep}>/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
