import React from 'react';
import { Outlet } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box } from '@mui/material';

export default function Layout() {
  const { isAtTop } = useScrollDirection();

  return (
    <div className="overflow-x-hidden min-h-screen">
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out 
        ${isAtTop ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <Header />
      </div>

      <main className="bg-gray-50 px-8 relative z-10">
        <div className="container mx-auto overflow-x-visible flex flex-col gap-20 pb-20">
          <Outlet />
        </div>
      </main>

      <div className="hidden md:block md:h-[480px] relative">
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -1,
            '@media (max-width: 767px)': {
              display: 'none',
            },
          }}
        >
          <source
            src="/footer-video.mp4"
            type="video/mp4"
            media="(min-width: 1200px)"
          />
        </Box>

        {/* Imagen de fondo para móviles */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            backgroundImage: 'url(/chaefOK.svg)',
            backgroundSize: 'cover',
            backgroundPosition: '-330px center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundColor: 'rgba(16, 185, 129, 0.3)',
            backgroundBlendMode: 'overlay',
            '@media (min-width: 768px)': {
              display: 'none',
            },
          }}
        />
      </div>

      <Footer />
    </div>
  );
}
