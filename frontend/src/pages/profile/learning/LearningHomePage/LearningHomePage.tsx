import type { JSX } from 'react';
import { PageHeader } from '../../../../components/common';
import { useUser } from '../../../../hooks/useUser';
import styles from './LearningHomePage.module.css';


export const LearningHomePage = (): JSX.Element => {
    const { data: user } = useUser();

    return (
        <div className={styles.pageWrapper}>
            <PageHeader title={`С возвращением, ${user?.firstName}`}>
                Продолжайте с того места, где остановились. Сегодня отличный день, чтобы приблизиться к цели.
            </PageHeader>
        </div>
    )
}
