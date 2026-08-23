import type { JSX } from 'react';
import { Link } from 'react-router';
import heroImage from '../../../../shared/assets/images/student_learning_online.webp';
import { HERO_STATS, HERO_TICKER_ITEMS } from '../../../../shared/constants';
import { Button, Divider, StatusBadge } from '../../../../shared/ui';
import styles from './Hero.module.css';
import UnderLineIcon from './underline.svg?react';


export const Hero = (): JSX.Element => {
  return (
    <section id="путь-к-сотке" className={styles.hero}>
      <div className={styles.grid}>

        {/* Left */}
        <div className={styles.left}>
          <div>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span className={styles.eyebrowText}>ИЗ НУЛЯ В СОТКУ / ЕГЭ 2025</span>
            </div>
            <Divider className={styles.dividerLine} />
          </div>

          <div>
            <h1 className={styles.heading}>
              <span className={styles.headingLine}>Твой путь</span>
              <span className={styles.headingLine}>к заветной</span>
              <span className={styles.headingLine}>
                <span className={styles.headingUnderline}>
                  сотне.
                  <UnderLineIcon className={styles.underlineSvg} />
                </span>
              </span>
            </h1>

            <p className={styles.desc}>
              Подготовка к ЕГЭ как увлекательная игра: кланы, квесты, наставники из топ-вузов
              и поддержка психолога. Начни бесплатно прямо сейчас.
            </p>

            <div className={styles.actions}>
              <Button as={Link} to="/" variant="primary" size="m" arrow="right" radius={16}>
                Бесплатная неделя
              </Button>
              <Button as={Link} to="/pricing" variant="outline" size="m" radius={16}>
                Выбрать тариф
              </Button>
            </div>
          </div>

          <Divider className={styles.statsDivider} />

          <div className={styles.statsBar}>
            {HERO_STATS.map((s, i) => (
              <div key={i} className={styles.statItem}>
                {i > 0 && <span className={styles.statDot} />}
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className={styles.right}>
          <img
            src={heroImage}
            alt="Студент увлеченно готовится к ЕГЭ онлайн"
            loading="lazy"
            className={styles.heroImage}
          />

          {/* Status card */}
          <StatusBadge 
             className={styles.statusCardWrapper} 
             progress={85} 
          />

          {/* Vertical ticker */}
          <div className={styles.verticalTicker} aria-hidden="true">
            <div className={styles.tickerInner}>
              {[...HERO_TICKER_ITEMS, ...HERO_TICKER_ITEMS].map((item, i) => (
                <span key={i} className={styles.tickerItem}>{item}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
