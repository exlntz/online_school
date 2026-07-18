import { Award, Brain, GraduationCap, ShieldCheck, Target, Users } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Ecosystem.module.css';


const features = [
  { num: '01', icon: Users, title: 'Геймификация и кланы', desc: 'Объединяйтесь в кланы по 20 человек, соревнуйтесь в битвах, выполняйте квесты и зарабатывайте достижения. Система уровней и очков делает подготовку к ЕГЭ азартным приключением.' },
  { num: '02', icon: Brain, title: 'Анонимная поддержка', desc: 'Ваше ментальное здоровье — наш приоритет. Получайте профессиональную психологическую помощь анонимно, чтобы справляться со стрессом и сохранять фокус на пути к 100 баллам.' },
  { num: '03', icon: GraduationCap, title: 'Наставники из топ-вузов', desc: 'Вас ведут кураторы из МГУ, МФТИ, ВШЭ и МИФИ. Они не только объясняют сложные темы, но и делятся личным опытом поступления в лучшие университеты страны.' },
  { num: '04', icon: ShieldCheck, title: 'Профиль родителя', desc: 'Полная прозрачность процесса: отслеживайте прогресс ребёнка, его успехи, пропуски и результаты тестов в удобном личном кабинете, чтобы всегда быть в курсе достижений.' },
  { num: '05', icon: Target, title: 'Умное повторение', desc: 'Система автоматически анализирует ваши ошибки и формирует индивидуальные задания для их проработки. Огонёк streak поддерживает мотивацию заниматься каждый день.' },
  { num: '06', icon: Award, title: 'Помощь с поступлением', desc: 'Мы не просто готовим к экзаменам, мы помогаем выстроить стратегию поступления, выбрать вуз мечты и подготовить все необходимые документы для зачисления.' },
];

const baseWords = ['МАТЕМАТИКА', 'ФИЗИКА', 'ИНФОРМАТИКА', 'РУССКИЙ ЯЗЫК'];
const tickerWords = [...baseWords, ...baseWords, ...baseWords, ...baseWords];

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
        <div className={styles.tickerTrack}>
          {[0,1].map(r => (
            <div key={r} className={styles.tickerGroup}>
            {tickerWords.map((t,i) => (
              <span key={i}>
                <span className={styles.tickerWord}>{t}</span>
                <span className={styles.tickerDot}>·</span>
              </span>
            ))}
          </div>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* LEFT: sticky heading */}
          <div className={styles.leftCol}>
            <div
              ref={leftRef}
              className={`${styles.stickyWrap} ${styles.reveal}`}  
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
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <li
                    key={f.num}
                    ref={el => { itemRefs.current[i] = el; }}
                    className={`${styles.listItem} ${i > 0 ? styles.listItemBorder : ''} ${styles.reveal}`}
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <div className={styles.itemMeta}>
                      <span className={styles.itemNum}>{f.num}</span>
                      <div className={styles.itemIconWrap}>
                        <Icon size={24} className={styles.itemIcon} />
                      </div>
                    </div>
                    <div className={styles.itemContent}>
                      <h3 className={styles.itemTitle}>{f.title}</h3>
                      <p className={styles.itemDesc}>{f.desc}</p>
                      <div className={styles.itemLine}>
                        <div className={styles.itemLineLine}></div>
                        <div className={styles.itemLineDot}></div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
