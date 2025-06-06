import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FavoritesLayout() {
  return (
    <div className="overflow-x-hidden min-h-screen">
      <div className={`fixed top-0 left-0 right-0 z-50`}>
        <Header />
      </div>

      <main className="bg-gray-50 px-8 relative z-10 min-h-screen">
        <div className="container mx-auto overflow-x-visible flex flex-col gap-20 pb-20">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
