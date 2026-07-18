import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import imgAlexey from '../../../assets/images/mentor_alexey.webp';
import imgDmitry from '../../../assets/images/mentor_dmitry.png';
import imgElena from '../../../assets/images/mentor_elena.webp';
import imgMaria from '../../../assets/images/mentor_maria.webp';
import styles from './Mentors.module.css';



const mentors = [
  { id: 'M-001', name: 'Алексей Смирнов', title: 'ВЫПУСКНИК МГУ — ЭКСПЕРТ ЕГЭ', tags: ['Алгебра', 'Геометрия'], img: imgAlexey },
  { id: 'M-003', name: 'Дмитрий Петров', title: 'ВЫПУСКНИК ВШЭ — ПРОГРАММИСТ', tags: ['Python', 'Алгоритмы'], img: imgDmitry },
  { id: 'M-004', name: 'Елена Соколова', title: 'ВЫПУСКНИК МИФИ — ФИЛОЛОГ', tags: ['Сочинение', 'Грамматика'], img: imgElena },
  { id: 'M-002', name: 'Мария Иванова', title: 'ВЫПУСКНИК МФТИ — МЕТОДИСТ', tags: ['Механика', 'Термодинамика'], img: imgMaria },
];

export const Mentors = (): JSX.Element => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add(styles.visible);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    [eyebrowRef, headingRef, subRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="наши-наставники" className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <p ref={eyebrowRef} className={`${styles.eyebrow} ${styles.animIn}`}>[04_TEAM]</p>
          <h1 ref={headingRef} className={`${styles.heading} ${styles.animIn} ${styles.animDelay1}`}>
            Наши наставники
          </h1>
          <p ref={subRef} className={`${styles.sub} ${styles.animIn} ${styles.animDelay2}`}>
            Лучшие выпускники топовых вузов страны, которые помогут вам сдать ЕГЭ на 100 баллов.
          </p>
        </div>

        {/* Filter toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.toolbarDollar}>$</span>
            <Search size={16} className={styles.toolbarSearchIcon} />
            <input className={styles.toolbarInput} placeholder="Поиск по имени или предмету..." />
          </div>
          <div className={styles.toolbarRight}>
            <button className={styles.toolbarBtn}>
              <ArrowUpDown size={14} />
              А–Я
            </button>
          </div>
        </div>

        <p className={styles.count}>[ ПОКАЗАНО 04 ИЗ 04 НАСТАВНИКОВ ]</p>

        {/* Grid */}
        <div className={styles.grid}>
          {mentors.map((m) => (
            <div key={m.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img src={m.img} alt={m.name} loading="lazy" className={styles.cardImg} />
              </div>
              <div className={styles.cardBody}>
                <div>
                  <h3 className={styles.cardName}>{m.name}</h3>
                  <p className={styles.cardTitle}>{m.title}</p>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardTags}>
                    {m.tags.map(t => <span key={t} className={styles.cardTag}>{t}</span>)}
                  </div>
                </div>
              </div>
              <div className={styles.cardHover}>
                <a href="#" className={styles.cardProfileLink}>→ Профиль</a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <p className={styles.paginationEmpty}></p>
          <nav className={styles.paginationNav}>
            <a href="#" className={styles.paginationPrev}>
              <ChevronLeft size={16} />
              <span>Previous</span>
            </a>
            <a href="#" className={`${styles.paginationPage} ${styles.paginationActive}`}>01</a>
            <a href="#" className={styles.paginationNext}>
              <span>Next</span>
              <ChevronRight size={16} />
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
