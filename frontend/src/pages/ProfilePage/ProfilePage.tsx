import type { JSX } from 'react'
import styles from './ProfilePage.module.css'


export const ProfilePage = (): JSX.Element => {
    return (
        <>
            <div className={styles.container}>
                <h1>Профиль в разработке</h1>
            </div>
        </>
    )
}