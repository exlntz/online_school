import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../../assets/images/student_learning_online.webp';
import ArrowRightIcon from './arrowRight.svg?react';
import styles from './Hero.module.css';
import MortarboardIcon from './mortarboard.svg?react';
import UnderLineIcon from './underline.svg?react';


const tickerItems = [
  'МАТЕМАТИКА → 100 БАЛЛОВ',
  'ФИЗИКА → 100 БАЛЛОВ',
  'ИНФОРМАТИКА → 100 БАЛЛОВ',
  'РУССКИЙ → 100 БАЛЛОВ',
];

const stats = [
  'Наставники из МГУ/ВШЭ',
  'Геймификация обучения',
  'Анонимный психолог',
  'Родительский контроль',
];

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
            <div className={styles.dividerLine} />
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
              <Link to="/" className={styles.btnPrimary}>
                Бесплатная неделя
                <ArrowRightIcon />
              </Link>
              <Link to="/pricing" className={styles.btnOutline}>
                Выбрать тариф
              </Link>
            </div>
          </div>

          <div className={styles.statsBar}>
            {stats.map((s, i) => (
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
          <div className={styles.statusCard}>
            <div className={styles.statusHeader}>
              <MortarboardIcon />
              <span className={styles.statusHeaderText}>Статус обучения</span>
            </div>
            <div className={styles.progressRow}>
              <span className={styles.progressDot} />
              <div className={styles.progressBar}>
                <div className={styles.progressFill} />
              </div>
              <span className={styles.progressDotEnd} />
            </div>
            <p className={styles.progressLabel}>ПРОГРЕСС: 85% К ЦЕЛИ</p>
            <div className={styles.statusBadge}>
              <span className={styles.pingDot}>
                <span className={styles.pingRipple} />
                <span className={styles.pingCore} />
              </span>
              <span className={styles.statusBadgeText}>В процессе</span>
            </div>
          </div>

          {/* Vertical ticker */}
          <div className={styles.verticalTicker} aria-hidden="true">
            <div className={styles.tickerInner}>
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className={styles.tickerItem}>{item}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
