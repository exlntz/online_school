import type { JSX } from 'react';
import { useSubject } from '../../../../entities/subject';
import { Container } from '../../../../shared/ui';
import { PageHeader } from '../../../../widgets/page-header';
import { PracticeSetup } from '../../../../widgets/practice-setup';

export const PracticePage = (): JSX.Element => {
    const subjectId = useSubject();
    
    const handlePracticeStart = (topics: string[], difficulty: number) => {
        console.log('Навигация на страницу теста с темами:', topics, difficulty);
    };

    return (
        <Container variant="page">
            <PageHeader />
            <PracticeSetup key={subjectId} onStart={handlePracticeStart} />
        </Container>
    );
};