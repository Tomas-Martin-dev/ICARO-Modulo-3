import { useEffect } from 'react';
import { useTranslation } from './useTranslation';
import { useRecipeStore } from '../store/recipeSlice';

export const useTranslatedContent = () => {
  const {
    currentLanguage,
    translateCategories,
    translateRecipes,
    translateSingleRecipe,
    isTranslating: isTranslatingHook,
  } = useTranslation();

  const {
    originalCategories,
    originalRecipes,
    originalRecipe,
    stateModal,
    updateTranslatedCategories,
    updateTranslatedRecipes,
    updateTranslatedRecipe,
    restoreOriginalContent,
    setTranslating,
    isTranslating: isTranslatingStore,
  } = useRecipeStore();

  useEffect(() => {
    const handleCategoryTranslation = async () => {
      if (originalCategories.length === 0) return;

      setTranslating(true);

      try {
        if (currentLanguage === 'en') {
          updateTranslatedCategories(originalCategories, 'en');
        } else {
          const translatedCategories =
            await translateCategories(originalCategories);
          updateTranslatedCategories(translatedCategories, currentLanguage);
        }
      } catch (error) {
        console.error('Error traduciendo categorías:', error);
      } finally {
        setTranslating(false);
      }
    };

    handleCategoryTranslation();
  }, [
    currentLanguage,
    originalCategories,
    translateCategories,
    updateTranslatedCategories,
    setTranslating,
  ]);

  useEffect(() => {
    const handleRecipesTranslation = async () => {
      if (originalRecipes.length === 0) return;

      setTranslating(true);

      try {
        if (currentLanguage === 'en') {
          updateTranslatedRecipes(originalRecipes, 'en');
        } else {
          const translatedRecipes = await translateRecipes(originalRecipes);
          updateTranslatedRecipes(translatedRecipes, currentLanguage);
        }
      } catch (error) {
        console.error('Error traduciendo recetas:', error);
      } finally {
        setTranslating(false);
      }
    };

    handleRecipesTranslation();
  }, [
    currentLanguage,
    originalRecipes,
    translateRecipes,
    updateTranslatedRecipes,
    setTranslating,
  ]);

  useEffect(() => {
    const handleRecipeTranslation = async () => {
      if (
        !originalRecipe ||
        Object.keys(originalRecipe).length === 0 ||
        !stateModal
      )
        return;

      setTranslating(true);

      try {
        if (currentLanguage === 'en') {
          updateTranslatedRecipe(originalRecipe, 'en');
        } else {
          const translatedRecipe = await translateSingleRecipe(originalRecipe);
          updateTranslatedRecipe(translatedRecipe, currentLanguage);
        }
      } catch (error) {
        console.error('Error traduciendo receta:', error);
      } finally {
        setTranslating(false);
      }
    };

    handleRecipeTranslation();
  }, [
    currentLanguage,
    originalRecipe,
    stateModal,
    translateSingleRecipe,
    updateTranslatedRecipe,
    setTranslating,
  ]);

  return {
    currentLanguage,
    isTranslating: isTranslatingHook || isTranslatingStore,
    restoreOriginalContent,
  };
};
