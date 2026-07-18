import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export const MainLayout = (): JSX.Element => {
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