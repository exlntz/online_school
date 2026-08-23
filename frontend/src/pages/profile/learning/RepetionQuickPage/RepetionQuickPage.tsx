import { RotateCcw } from 'lucide-react';
import { useState, type JSX } from 'react';
import { Flashcard, FlashcardProgress, type FlashcardModel } from '../../../../entities/flashcard';
import { MOCK_QUICK_REVIEW_CARDS } from '../../../../shared/constants';
import { Button, Container } from '../../../../shared/ui';
import { PageHeader } from '../../../../widgets/page-header';
import styles from './RepetionQuickPage.module.css';


export const RepetionQuickPage = (): JSX.Element => {
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const card: FlashcardModel = MOCK_QUICK_REVIEW_CARDS[index];

    const handleNext = () => {
        setFlipped(false);
        setIndex((prevIndex) => (prevIndex + 1) % MOCK_QUICK_REVIEW_CARDS.length);
    };

    const toggleFlip = () => {
        setFlipped((prev) => !prev);
    };

    return (
        <Container variant='page'>
            <PageHeader />

            <div className={styles.container}>
                <FlashcardProgress 
                    currentIndex={index} 
                    total={MOCK_QUICK_REVIEW_CARDS.length} 
                    fromMistake={card.fromMistake} 
                />

                <Flashcard 
                    card={card} 
                    flipped={flipped} 
                    onClick={toggleFlip}
                    aria-label="Перевернуть карточку"
                />

                {/* Actions */}
                <div className={styles.actions}>
                    <Button
                        type="button"
                        variant="soft"
                        size="s"
                        onClick={toggleFlip}
                        radius={16}
                    >
                        <RotateCcw size={16} />
                        Перевернуть
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        size="s"
                        onClick={handleNext}
                        disableJump
                        radius={16}
                    >
                        Следующая
                    </Button>
                </div>
            </div>
        </Container>
    );
};