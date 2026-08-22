import { Star } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { TestimonialCard } from '../../../../entities/review';
import { TESTIMONIALS_MARQUEE_WORDS, TESTIMONIALS_REVIEWS } from '../../../../shared/constants';
import { cn } from '../../../../shared/lib';
import { Container, Marquee } from '../../../../shared/ui';
import styles from './Testimonials.module.css';


export const Testimonials = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.visible);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="голоса-выпускников" className={styles.section}>
      <Container>
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(styles.header, styles.reveal)}
        >
          <p className={styles.eyebrow}>• 05 / ИСТОРИИ УСПЕХА</p>
          <h2 className={styles.heading}>
            Более <span className={styles.primary}>10 000</span> выпускников сдали на 90+.
          </h2>
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[0,1,2,3,4].map(i => <Star key={i} className={styles.starBig} />)}
            </div>
            <span className={styles.ratingNum}>4.9 / 5.0</span>
            <span className={styles.ratingBase}>На основе 2 340 отзывов</span>
          </div>
        </div>

        {/* Cards grid */}
        <div className={styles.grid}>
          {TESTIMONIALS_REVIEWS.map((r, i) => (
            <TestimonialCard 
              key={i}
              name={r.name}
              subject={r.subject}
              text={r.text}
              rating={r.rating}
              offset={r.offset}
            />
          ))}
        </div>
      </Container>

      {/* Bottom marquee */}
      <div className={styles.marqueeWrap}>
        <Marquee items={TESTIMONIALS_MARQUEE_WORDS} speed={60} />
      </div>
    </section>
  );
}
