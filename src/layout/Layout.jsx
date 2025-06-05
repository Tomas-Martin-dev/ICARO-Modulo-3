import React from 'react';
import { Outlet } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import Header from '../components/Header';

export default function Layout() {
  const { isAtTop } = useScrollDirection();

  return (
    <div className="overflow-x-hidden">
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out 
        ${isAtTop ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <Header />
      </div>

      <main className="container mx-auto overflow-x-visible">
        <Outlet />
      </main>
    </div>
  );
}
