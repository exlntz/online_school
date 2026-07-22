import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { useScrollToTop } from '../../../hooks/useScrollToTop';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export const MainLayout = (): JSX.Element => {
  useScrollToTop();
  
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh' }}>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};