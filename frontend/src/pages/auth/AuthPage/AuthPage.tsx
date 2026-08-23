import { ArrowLeft } from 'lucide-react';
import { useState, type JSX } from 'react';
import { Link } from 'react-router';
import type { AuthValues } from '../../../features/auth';
import { Container } from '../../../shared/ui';
import styles from './AuthPage.module.css';
import type { AuthPageProps } from "./AuthPage.props";
import { CodeStep } from './CodeStep/CodeStep';
import { PhoneStep } from './PhoneStep/PhoneStep';


export const AuthPage = ({ mode, className, ...props }: AuthPageProps): JSX.Element => {
    const [step, setStep] = useState<'phone' | 'code'>('phone');
    const [authData, setAuthData] = useState<AuthValues | null>(null);

    const handlePhoneSuccess = (data: AuthValues) => {
        setAuthData(data);
        setStep('code');
    };

    return (
        <Container variant='layout' className={className} {...props}>
            <Link to="/" className={styles.backLink}>
                <ArrowLeft size={20} />
                <span className={styles.backButtonText}>На главную</span>
            </Link>

            {step === 'phone' ? (
                <PhoneStep
                    mode={mode}
                    onSuccess={handlePhoneSuccess}
                />
            ) : (
                authData && (
                    <CodeStep 
                        mode={mode}
                        phoneNumber={authData.phoneNumber}
                        firstName={authData.firstName}
                        role={authData.role}
                        onChangeNumber={() => setStep('phone')}
                    />
                )
            )}
        </Container>
    )
} 