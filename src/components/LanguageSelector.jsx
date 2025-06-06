import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Languages } from 'lucide-react';

export default function LanguageSelector({ variant = 'header' }) {
  const { currentLanguage, changeLanguage, getAvailableLanguages } =
    useTranslation();

  const languages = getAvailableLanguages();

  const handleLanguageChange = event => {
    changeLanguage(event.target.value);
  };

  const handleContainerClick = event => {
    if (variant === 'drawer') {
      event.stopPropagation();
    }
  };

  const headerStyles =
    'flex items-center hover:bg-emerald-600 rounded-md py-2 px-4 transition-colors duration-300 !text-xs md:!text-sm';

  const drawerStyles = 'flex items-center py-2 px-4 text-black justify-center';

  const containerClass = variant === 'drawer' ? drawerStyles : headerStyles;

  const iconClass =
    variant === 'drawer' ? 'text-black w-5 h-5' : 'text-white w-5 h-5';
  const selectClass =
    variant === 'drawer'
      ? 'appearance-none bg-transparent border-none cursor-pointer px-3 uppercase text-black rounded focus:outline-none'
      : 'appearance-none bg-transparent border-none cursor-pointer px-3 uppercase text-white rounded hover:border-white focus:border-white focus:outline-none';

  return (
    <div className={containerClass} onClick={handleContainerClick}>
      <Languages className={iconClass} />

      <div className="relative">
        <select
          value={currentLanguage}
          onChange={handleLanguageChange}
          className={selectClass}
        >
          {languages.map(lang => (
            <option
              key={lang.code}
              value={lang.code}
              className="text-black uppercase !text-xs md:!text-sm"
            >
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
