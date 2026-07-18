import { Quote, Star } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';


const reviews = [
  { name: 'Алексей В.', subject: 'Математика, 92 балла', text: 'Благодаря «Из нуля в сотку» я поднял математику с 40 до 92 баллов. Система кланов и постоянные квесты не давали расслабиться, а куратор всегда был на связи.' },
  { name: 'Мария К.', subject: 'Русский язык, 96 баллов', text: 'Психологическая поддержка — это то, чего не хватало в других школах. Анонимные консультации помогли справиться с паникой перед экзаменом и поверить в свои силы.', offset: true },
  { name: 'Дмитрий С.', subject: 'Информатика, 94 балла', text: 'Кураторы из МФТИ объясняют всё на пальцах. Система отслеживания прогресса для родителей — отличная фишка, мама была спокойна за мою подготовку.' },
  { name: 'Елена П.', subject: 'Физика, 90 баллов', text: 'Streak-огонёк стал моей зависимостью! Не пропустил ни одного дня занятий за полгода. Это лучший способ подготовки к ЕГЭ, который я пробовал.' },
  { name: 'Иван М.', subject: 'Математика, 95 баллов', text: 'Битвы кланов — это нечто! Мы соревновались с другими группами, решали задачи на скорость и получали достижения. Учиться было по-настоящему весело и азартно.', offset: true },
  { name: 'София Л.', subject: 'Русский язык, 98 баллов', text: 'Помощь с поступлением от наставников из топовых вузов — это бесценно. Я точно знал, куда подавать документы, благодаря их советам.' },
];

const marqueeWords = ['МАТЕМАТИКА', 'ФИЗИКА', 'ИНФОРМАТИКА', 'РУССКИЙ ЯЗЫК', 'ЕГЭ 2024', 'ПОСТУПЛЕНИЕ', 'КУРАТОРЫ', 'КВЕСТЫ', 'СТРИКИ', 'РЕЗУЛЬТАТ'];

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
      <div className={styles.inner}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`${styles.header} ${styles.reveal}`}
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
          {reviews.map((r, i) => (
            <article key={i} className={`${styles.card} ${r.offset ? styles.cardOffset : ''}`}>
              <Quote className={styles.quoteIcon} />
              <blockquote className={styles.quote}>{r.text}</blockquote>
              <div className={styles.separator}></div>
              <div className={styles.cardFooter}>
                <div className={styles.cardAuthor}>
                  <p className={styles.authorName}>{r.name}</p>
                  <p className={styles.authorSubject}>{r.subject}</p>
                </div>
                <div className={styles.cardStars}>
                  {[0,1,2,3,4].map(j => <Star key={j} className={styles.starSmall} />)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom marquee */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeWord}>{w}</span>
              <span className={styles.marqueeDot}>•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
