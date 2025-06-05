import React, { useEffect } from 'react';
import { getRecipes } from '../services/recipes';

function HomePage() {
  useEffect(() => {
    getRecipes('pollo');
  }, []);
  return (
    <>
      <div className="min-h-[80vh] lg:min-h-dvh lg:flex xl:items-center py-16 px-4 lg:p-16 relative">
        <div className="w-full md:w-1/2 lg:w-2/5 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-7xl font-bold text-left text-gray-800 filter drop-shadow-md">
            ¿Qué cocinamos hoy?{' '}
            <span className="mt-2 text-emerald-500 block">
              Encuentra la receta perfecta.
            </span>
          </h1>
        </div>

        <img
          src="/chef2.svg"
          alt="Ilustración de un chef"
          className="absolute top-7/12 md:top-1/2 -translate-y-1/2 w-full h-auto right-[-10vw] z-0 pointer-events-none scale-125 md:scale-125 lg:scale-100"
        />
      </div>

      <div className="relative flex flex-col items-center justify-start py-10 min-h-[50vh] bg-red-500 z-50">
        <h2 className="text-2xl font-bold text-gray-700">
          Encuentra la receta perfecta para tu paladar.
        </h2>
      </div>
    </>
  );
}

export default HomePage;
