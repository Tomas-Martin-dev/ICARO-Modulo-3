import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Languages } from 'lucide-react';

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, getAvailableLanguages } =
    useTranslation();

  const languages = getAvailableLanguages();

  const handleLanguageChange = event => {
    changeLanguage(event.target.value);
  };

  return (
    <div className="flex items-center hover:bg-emerald-600 rounded-md py-2 px-4 transition-colors duration-300">
      <Languages className="text-white w-5 h-5" />

      <div className="relative">
        <select
          value={currentLanguage}
          onChange={handleLanguageChange}
          className="appearance-none bg-transparentborder-none cursor-pointer px-3 uppercase text-white rounded hover:border-white focus:border-white focus:outline-none"
        >
          {languages.map(lang => (
            <option
              key={lang.code}
              value={lang.code}
              className="text-black uppercase "
            >
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
