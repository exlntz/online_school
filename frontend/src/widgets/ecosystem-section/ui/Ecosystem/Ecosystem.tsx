import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ECOSYSTEM_FEATURES, ECOSYSTEM_TICKER_ITEMS } from '../../../../shared/constants';
import { cn } from '../../../../shared/lib';
import { Container, FeatureItem, Marquee } from '../../../../shared/ui';
import styles from './Ecosystem.module.css';


export const Ecosystem = (): JSX.Element => {
  const leftRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (leftRef.current) observer.observe(leftRef.current);
    itemRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="игровая-экосистема" className={styles.section}>
      {/* Bottom ticker strip */}
      <div className={styles.bottomTicker}>
        <Marquee items={ECOSYSTEM_TICKER_ITEMS} />
      </div>

      <Container>
        <div className={styles.grid}>
          {/* LEFT: sticky heading */}
          <div className={styles.leftCol}>
            <div
              ref={leftRef}
              className={cn(styles.stickyWrap, styles.reveal)}
            >
              <div className={styles.bg100} aria-hidden="true">100</div>
              <p className={styles.eyebrow}>§ 01 · ЭКОСИСТЕМА ОБУЧЕНИЯ</p>
              <div className={styles.divider}>
                <div className={styles.dividerLine}></div>
                <div className={styles.dividerDot}></div>
              </div>
              <h2 className={styles.heading}>
                Почему выбирают <span className={styles.primary}>нас</span>
              </h2>
              <p className={styles.subtext}>
                Мы создали уникальную среду, где подготовка к ЕГЭ превращается из рутины в увлекательный процесс. Геймификация, поддержка наставников и психологический комфорт — всё для вашего результата.
              </p>
              <Link to="/page_2" className={styles.ctaLink}>Выбрать тариф</Link>
            </div>
          </div>

          {/* RIGHT: vertical list */}
          <div className={styles.rightCol}>
            <ul className={styles.list}>
              {ECOSYSTEM_FEATURES.map((f, i) => (
                <FeatureItem 
                  key={f.num}
                  ref={el => { itemRefs.current[i] = el; }}
                  num={f.num}
                  icon={f.icon}
                  title={f.title}
                  description={f.desc}
                  delay={i * 90}
                  hasDivider={i < ECOSYSTEM_FEATURES.length - 1}
                  className={styles.reveal}
                />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
