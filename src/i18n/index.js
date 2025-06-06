import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// textos estáticos
const resources = {
  es: {
    translation: {
      ui: {
        whatToCook: '¿Qué cocinamos hoy?',
        findPerfectRecipe: 'Encuentra la receta perfecta.',
        selectCategory: 'Selecciona una categoría para ver las recetas',
        category: 'Categoría',
        loading: 'Cargando...',
        ingredients: 'Ingredientes:',
        instructions: 'Instrucciones:',
        addToFavorites: 'Agregar a Favoritos',
        close: 'Cerrar',
      },
      languages: {
        es: 'Español',
        en: 'English',
      },
    },
  },
  en: {
    translation: {
      ui: {
        whatToCook: 'What are we cooking today?',
        findPerfectRecipe: 'Find the perfect recipe.',
        selectCategory: 'Select a category to view recipes',
        category: 'Category',
        loading: 'Loading...',
        ingredients: 'Ingredients:',
        instructions: 'Instructions:',
        addToFavorites: 'Add to Favorites',
        close: 'Close',
      },
      languages: {
        es: 'Spanish',
        en: 'English',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
