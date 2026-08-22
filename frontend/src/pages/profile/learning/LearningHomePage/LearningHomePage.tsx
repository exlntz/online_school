import type { JSX } from 'react';
import { PageHeader } from '../../../../components/common';
import { NextLesson, StatsPanel, UpcomingLessons } from '../../../../components/profile';
import { SUBJECTS } from '../../../../data/profile.data';
import { MOCK_API_LESSON } from '../../../../data/temp.data';
import { useUser } from '../../../../hooks/useUser';
import { Container } from '../../../../shared/ui';
import styles from './LearningHomePage.module.css';
import { useSubject } from '../../../../entities/subject';


export const LearningHomePage = (): JSX.Element => {
    const { data: user } = useUser();

    const currentSubjectId = useSubject();
    const currentSubject = SUBJECTS.find((s) => s.id === currentSubjectId); 

    return (
        <Container variant='page'>
            <PageHeader title={`С возвращением, ${user?.firstName}`} />

            <main className={styles.grid}>
                {/* Left column */}
                <div className={styles.lessons}>
                    <NextLesson lesson={MOCK_API_LESSON} />
                    <UpcomingLessons title='Дальше в программе' />
                </div>
                
                {/* Right column */}
                <StatsPanel title='Ваш прогресс' subject={currentSubject?.label}>
                    «Каждый эксперт когда-то был новичком. Ты уже на две трети пути.»
                </StatsPanel>
            </main>
        </Container>
    )
}
