import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] lg:min-h-dvh lg:flex xl:items-center py-16 px-4 lg:p-16 relative ">
      <div className="w-full md:w-1/2 lg:w-2/5 relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-7xl font-bold text-left text-gray-800 filter drop-shadow-md select-none">
          {t('ui.whatToCook')}{' '}
          <span className="mt-2 text-emerald-500 block">
            {t('ui.findPerfectRecipe')}
          </span>
        </h1>
      </div>

      <img
        src="/chef2.svg"
        alt="Ilustración de un chef"
        className="absolute top-10/12 sm:top-1/2 select-none -translate-y-1/2 w-full h-auto right-[-10vw] z-0 pointer-events-none scale-125 md:scale-125 lg:scale-100"
      />
    </div>
  );
}
