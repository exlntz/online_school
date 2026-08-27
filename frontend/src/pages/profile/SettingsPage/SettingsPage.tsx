import { useState, type JSX } from 'react';
import { Container, Tabs } from '../../../shared/ui';
import type { TabItem } from '../../../shared/ui/Tabs/Tabs.props';
import { ProfileData } from '../../../widgets/user-profile-settings';
import styles from './SettingsPage.module.css';
import { PaymentMethod } from '../../../widgets/payment-method';
import { SubscriptionTier, SubscriptionSubjects } from '../../../widgets/subscription-manager';


const TABS_CONFIG: TabItem[] = [
    { id: 'profile', label: 'Профиль' },
    { id: 'subscription', label: 'Подписка' },
];

export const SettingsPage = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState<string>('profile');

    return (
        <Container>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <Tabs 
                        tabs={TABS_CONFIG} 
                        activeTab={activeTab} 
                        onChange={setActiveTab} 
                    />

                    <div className={styles.content}>
                        {activeTab === 'profile' ? (
                            <ProfileData /> 
                        ) : (
                            <>
                                <SubscriptionTier />
                                <SubscriptionSubjects />
                                <PaymentMethod />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};