import type { JSX } from "react";
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import DiagonalArrowIcon from './diagonalArrow.svg?react';


const menuLinks = [
  { label: 'Главная', href: '/' },
  { label: 'Тарифы', href: '/pricing' },
  { label: 'Наставники', href: '/#наши-наставники' },
  { label: 'Пробная неделя', href: '/#твой-тест-драйв' },
];

export const Footer = (): JSX.Element => {
  return (
    <footer id="подвал" className={styles.footer}>
      <div className={styles.dotPattern} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Hero row */}
        <div className={styles.heroRow}>
          <h2 className={styles.bigHeading}>
            Путь
            <span className={styles.bigHeadingItalic}>к сотке.</span>
          </h2>
          <div>
            <Link to="/" className={styles.ctaBtn}>
              Начать обучение
              <DiagonalArrowIcon />
            </Link>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Grid */}
        <div className={styles.grid}>
          {/* Col 1: Logo + socials */}
          <div className={styles.col}>
            <Link to="/" className={styles.logoWrapper}>
              <div className={styles.logoMark}>0→</div>
              <div className={styles.logoText}>Из нуля<br />в сотку</div>
            </Link>
            <p className={styles.tagline}>Онлайн-школа ЕГЭ — 2025</p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
              <a href="#" aria-label="VK" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.496c.598-.19 1.365 1.26 2.179 1.815.615.422 1.082.33 1.082.33l2.17-.03s1.136-.07.597-1.004c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.182-1.06.462-3.248.999-1.33 1.399-2.142 1.273-2.49-.12-.332-.863-.244-.863-.244l-2.442.015s-.181-.025-.315.056c-.132.08-.217.267-.217.267s-.388 1.035-.905 1.913c-1.09 1.85-1.527 1.948-1.705 1.834-.414-.268-.311-1.074-.311-1.648 0-1.793.272-2.54-.528-2.733-.265-.064-.46-.106-1.138-.113-.87-.009-1.605.003-2.02.207-.277.136-.491.44-.36.457.161.021.526.098.72.36.25.34.241 1.104.241 1.104s.144 2.11-.335 2.372c-.329.18-.781-.187-1.752-1.865-.498-.86-.874-1.81-.874-1.81s-.072-.181-.202-.278c-.157-.117-.377-.154-.377-.154l-2.319.015s-.348.01-.476.161c-.114.135-.009.414-.009.414s1.816 4.25 3.872 6.394c1.886 1.967 4.028 1.838 4.028 1.838h.97z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Menu */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Меню</h3>
            <ul className={styles.navList}>
              {menuLinks.map((link) => (
                <li key={link.href} className={styles.navItem}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Контакты</h3>
            <address className={styles.address}>
              <span className={styles.addressLine}>Москва, ул. Академическая, 1</span>
              <a href="tel:+78000000000" className={styles.addressLink}>8 (800) 000-00-00</a>
              <a href="mailto:support@zero-to-hundred.ru" className={styles.addressLink}>
                support@zero-to-hundred.ru
              </a>
            </address>
          </div>

          {/* Col 4: Hours */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Режим работы</h3>
            <ul className={styles.hoursList}>
              <li className={styles.hoursRow}><span>Пн–Пт</span><span>09:00 — 21:00</span></li>
              <li className={styles.hoursRow}><span>Сб–Вс</span><span>10:00 — 18:00</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Из нуля в сотку. Все права защищены.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Политика конфиденциальности</a>
            <a href="#" className={styles.bottomLink}>Оферта</a>
          </div>
        </div>

        <div className={styles.watermarkWrapper}>
          <div className={styles.watermark}>100</div>
        </div>
      </div>
    </footer>
  );
}
