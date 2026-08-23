import type { JSX } from 'react';
import { VariantCard, type VariantModel } from '../../../../entities/variant';
import { MOCK_VARIANTS } from '../../../../shared/constants';
import { Container } from '../../../../shared/ui';
import { PageHeader } from '../../../../widgets/page-header';
import styles from './VariantsPage.module.css';

export const VariantsPage = (): JSX.Element => {
    return (
        <Container variant='page'>
            <PageHeader />

            <div className={styles.grid}>
                {MOCK_VARIANTS.map((v) => (
                    <VariantCard 
                        key={v.title} 
                        variant={v as VariantModel} 
                    />
                ))}
            </div>
        </Container>
    );
};