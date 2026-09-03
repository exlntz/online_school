import { useState, type JSX } from 'react';
import { PsychologistCard, PsychologistListItem, PsychologistNotesCard } from '../../../entities/psychologist';
import { MOCK_AVAILABLE_PSYCHOLOGISTS, MOCK_CURRENT_PSYCHOLOGIST, MOCK_PSYCHOLOGIST_NOTES } from '../../../shared/constants';
import { Container, ModalWindow } from '../../../shared/ui';
import styles from './PsychologistPage.module.css';


export const PsychologistPage = (): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectPsychologist = (id: string) => {
        console.log('Выбран психолог:', id);
        setIsModalOpen(false);
    };

    return (
        <Container className={styles.container}>
            <PsychologistCard 
                psychologist={MOCK_CURRENT_PSYCHOLOGIST}
                telegramUrl="https://t.me/"
                onChangeClick={() => setIsModalOpen(true)} 
            />

            <PsychologistNotesCard notes={MOCK_PSYCHOLOGIST_NOTES} />

            <ModalWindow 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="Выберите психолога"
            >
                <ul className={styles.modalList}>
                    {MOCK_AVAILABLE_PSYCHOLOGISTS.map((p) => (
                        <PsychologistListItem 
                            key={p.id} 
                            psychologist={p} 
                            onSelect={() => handleSelectPsychologist(p.id)} 
                        />
                    ))}
                </ul>
            </ModalWindow>
        </Container>
    );
};