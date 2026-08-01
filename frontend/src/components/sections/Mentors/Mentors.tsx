import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import imgAlexey from '../../../assets/images/mentor_alexey.webp';
import imgDmitry from '../../../assets/images/mentor_dmitry.png';
import imgElena from '../../../assets/images/mentor_elena.webp';
import imgMaria from '../../../assets/images/mentor_maria.webp';
import { cn } from '../../../utils/cn';
import { MentorCard } from '../../common';
import { Button, Container, Divider, Search } from '../../ui';
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

  const [ searchQuery, setSearchQuery ]= useState('');

  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
      <Container>
        {/* Header */}
        <div className={styles.header}>
          <p ref={eyebrowRef} className={cn(styles.eyebrow, styles.animIn)}>[04_TEAM]</p>
          <h1 ref={headingRef} className={cn(styles.heading, styles.animIn, styles.animDelay1)}>
            Наши наставники
          </h1>
          <p ref={subRef} className={cn(styles.sub, styles.animIn, styles.animDelay2)}>
            Лучшие выпускники топовых вузов страны, которые помогут вам сдать ЕГЭ на 100 баллов.
          </p>
        </div>

        {/* Filter toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.toolbarDollar}>$</span>
            <Search 
                onSearch={setSearchQuery} 
                placeholder="Поиск по имени или предмету..."
                iconPosition='left'
            />
          </div>
          <div className={styles.toolbarRight}>
            <Button variant="ghost-secondary" size="s" className={styles.toolbarBtn}>
              <ArrowUpDown size={14} />
              А–Я
            </Button>
          </div>
        </div>

        <p className={styles.count}>
            [ ПОКАЗАНО {String(filteredMentors.length).padStart(2, '0')} ИЗ {String(mentors.length).padStart(2, '0')} НАСТАВНИКОВ ]
        </p>

        {/* Grid */}
        <div className={styles.grid}>
          {filteredMentors.map((m) => (
            <MentorCard 
              key={m.id}
              name={m.name}
              title={m.title}
              tags={m.tags}
              img={m.img}
              // profileUrl={`/mentors/${m.id}`} 
            />
          ))}
        </div>

        {/* Pagination */}
        <Divider className={styles.paginationDivider} />
        
        <div className={styles.pagination}>
          <p className={styles.paginationEmpty}></p>
          <nav className={styles.paginationNav}>
            <Button 
              variant="ghost-secondary" 
              size="s" 
              noBg
              className={styles.paginationBtn}
            >
              <ChevronLeft size={16} />
              <span className={styles.paginationText}>Previous</span>
            </Button>

            <a href="#" className={`${styles.paginationPage} ${styles.paginationActive}`}>01</a>

            <Button 
              variant="ghost-secondary" 
              size="s" 
              noBg
              className={styles.paginationBtn}
            >
              <span className={styles.paginationText}>Next</span>
              <ChevronRight size={16} />
            </Button>
          </nav>
        </div>
      </Container>
    </section>
  );
}
