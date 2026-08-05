import { AlertOctagon } from 'lucide-react';
import { type JSX } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button, Card, Container } from '../../components/ui';
import { parseApiError } from '../../helpers/error.helpers';
import styles from './ErrorPage.module.css';
import type { ErrorPageProps } from './ErrorPage.props';


export const ErrorPage = ( { className, ...props }: ErrorPageProps ): JSX.Element => {
    const error = useRouteError();

    const errorMessage = isRouteErrorResponse(error)
        ? error.data?.message || error.statusText
        : parseApiError(error, 'Произошла непредвиденная ошибка');

    const handleReload = () => {
        window.location.href = '/';
    };

    return (
        <Container variant="layout" className={className} {...props}>
            <Card className={styles.cardWrapper}>
                <div className={styles.cardContent}>
                    <div className={styles.header}>
                        <AlertOctagon className={styles.icon} />
                        <h1 className={styles.title}>Упс! Что-то сломалось</h1>
                    </div>

                    <p className={styles.description}>
                        Мы уже знаем о проблеме и работаем над ее устранением. 
                        Вы можете вернуться на главную страницу и попробовать снова.
                    </p>

                    <div className={styles.errorDetails}>
                        {errorMessage}
                    </div>

                    <div className={styles.actions}>
                        <Button
                            onClick={handleReload}
                            variant="primary"
                            size="m"
                        >
                            Вернуться на главную
                        </Button>
                    </div>
                </div>
            </Card>
        </Container>
    );
};