import type { JSX } from 'react';
import { Outlet } from 'react-router';
import { cn, useScrollToTop } from '../../../shared/lib';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './MainLayout.module.css';
import type { MainLayoutProps } from './MainLayout.props';


export const MainLayout = ({ className, ...props }: MainLayoutProps): JSX.Element => {
  useScrollToTop();
  
  return (
    <div className={cn(styles.layout, className)} {...props}>
      <Header />
      <main className={styles.main}>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};