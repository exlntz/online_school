import type { JSX } from "react";
import { Link } from 'react-router';
import { Logo } from "../../../../components/navigation";
import { cn } from "../../../../shared/lib";
import { Button, Container, Divider } from "../../../../shared/ui";
import styles from './Footer.module.css';
import type { FooterProps } from "./Footer.props";
import InstagramIcon from './icons/instagram.svg?react';
import VkIcon from './icons/vk.svg?react';
import YoutubeIcon from './icons/youtube.svg?react';


const menuLinks = [
  { label: 'Главная', href: '/' },
  { label: 'Тарифы', href: '/pricing' },
  { label: 'Наставники', href: '/#наши-наставники' },
  { label: 'Пробная неделя', href: '/#твой-тест-драйв' },
];

export const Footer = ( { className, ...props }: FooterProps ): JSX.Element => {
  return (
    <footer id="подвал" className={cn(styles.footer, className)} {...props}>
      <div className={styles.dotPattern} aria-hidden="true" />

      <Container className={styles.footerContent}>
        {/* Hero row */}
        <div className={styles.heroRow}>
          <h2 className={styles.bigHeading}>
            Путь
            <span className={styles.bigHeadingItalic}>к сотке.</span>
          </h2>
          <div>
            <Button 
              as={Link} 
              to="/" 
              variant="primary" 
              size="l" 
              radius={16} 
              arrow="right-up" 
              disableJump
              className={styles.ctaBtn}
            >
              Начать обучение
            </Button>
          </div>
        </div>

        <Divider variant="dark" />

        {/* Grid */}
        <div className={styles.grid}>
          {/* Col 1: Logo + socials */}
          <div className={styles.col}>
            <Logo variant="footer" />
            
            <p className={styles.tagline}>Онлайн-школа ЕГЭ — 2025</p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <InstagramIcon />
              </a>
              <a href="#" aria-label="YouTube" className={styles.socialLink}>
                <YoutubeIcon />
              </a>
              <a href="#" aria-label="VK" className={styles.socialLink}>
                <VkIcon />
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

        <Divider variant="dark" />

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
      </Container>
    </footer>
  );
}
