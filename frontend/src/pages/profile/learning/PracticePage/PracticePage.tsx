import type { JSX } from 'react'
import styles from './PracticePage.module.css'


export const PracticePage = (): JSX.Element => {
    return (
        <>
            <div className={styles.container}>
                <h1>Страница "практика" в разработке</h1>
            </div>
        </>
    )
}
