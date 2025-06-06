import { useTranslation as useI18n } from 'react-i18next';
import { useState, useCallback } from 'react';
import {
  translateText,
  translateArray,
  translateRecipe,
} from '../services/translation';

export const useTranslation = () => {
  const { t, i18n } = useI18n();
  const [isTranslating, setIsTranslating] = useState(false);

  const changeLanguage = useCallback(
    lng => {
      i18n.changeLanguage(lng);
    },
    [i18n]
  );

  const translateContent = useCallback(
    async text => {
      if (!text) return text;

      if (i18n.language === 'en') return text;

      setIsTranslating(true);
      try {
        const translation = await translateText(text);
        return translation;
      } finally {
        setIsTranslating(false);
      }
    },
    [i18n.language]
  );

  const translateCategories = useCallback(
    async categories => {
      if (!categories || categories.length === 0) return categories;

      if (i18n.language === 'en') return categories;

      setIsTranslating(true);
      try {
        const categoryNames = categories.map(cat => cat.strCategory);
        const translatedNames = await translateArray(categoryNames);

        return categories.map((category, index) => ({
          ...category,
          strCategory: translatedNames[index],
          originalCategory: category.strCategory,
        }));
      } finally {
        setIsTranslating(false);
      }
    },
    [i18n.language]
  );

  const translateRecipes = useCallback(
    async recipes => {
      if (!recipes || recipes.length === 0) return recipes;

      if (i18n.language === 'en') return recipes;

      setIsTranslating(true);
      try {
        const translatedRecipes = await Promise.all(
          recipes.map(recipe => translateRecipe(recipe))
        );
        return translatedRecipes;
      } finally {
        setIsTranslating(false);
      }
    },
    [i18n.language]
  );

  const translateSingleRecipe = useCallback(
    async recipe => {
      if (!recipe) return recipe;

      if (i18n.language === 'en') return recipe;

      setIsTranslating(true);
      try {
        const translatedRecipe = await translateRecipe(recipe);
        return translatedRecipe;
      } finally {
        setIsTranslating(false);
      }
    },
    [i18n.language]
  );

  const getAvailableLanguages = () => {
    return [
      { code: 'en', name: t('languages.en'), flag: '🇺🇸' },
      { code: 'es', name: t('languages.es'), flag: '🇪🇸' },
    ];
  };

  return {
    t,
    changeLanguage,
    currentLanguage: i18n.language,
    translateContent,
    translateCategories,
    translateRecipes,
    translateSingleRecipe,
    isTranslating,
    getAvailableLanguages,
    isEnglish: i18n.language === 'en',
    isSpanish: i18n.language === 'es',
  };
};
