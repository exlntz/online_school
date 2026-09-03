import { type JSX } from 'react';
import { Container } from '../../../shared/ui';
import { ProfileSummary } from '../../../widgets/statistics-dashboard';
import styles from './StatisticsPage.module.css';


export const StatisticsPage = (): JSX.Element => {

    return (
        <Container className={styles.container}>
            <ProfileSummary />

        
        </Container>
    );
};