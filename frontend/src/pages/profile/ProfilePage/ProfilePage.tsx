import type { JSX } from 'react';
import { DashboardCard } from '../../../components/profile';
import { PROFILE_DASHBOARD_CARDS } from '../../../data/profile.data';
import { useUser } from '../../../hooks/useUser';
import styles from './ProfilePage.module.css';


export const ProfilePage = (): JSX.Element => {
    const { data: user } = useUser();

    return (
        <div className={styles.main}>
            <div className={styles.headerSection}>
                <p className={styles.subtitle}>
                    {user ? `Добро пожаловать, ${user.firstName}` : "Добро пожаловать"}
                </p>
                <h1 className={styles.title}>
                    С чего начнём сегодня?
                </h1>
            </div>

            <div className={styles.grid}>
                {PROFILE_DASHBOARD_CARDS.map((card) => (
                    <DashboardCard key={card.title} {...card} />
                ))}
            </div>
        </div>
    )
}