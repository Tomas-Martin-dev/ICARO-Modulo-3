import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useRecipeStore } from '../store/recipeSlice';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import { useTranslation } from '../hooks/useTranslation';
import { useTranslatedContent } from '../hooks/useTranslatedContent';
import HeroSection from '../components/HeroSection';

function HomePage() {
  const {
    categories,
    fetchCategories,
    recipes,
    fetchRecipesByCategory,
    stateModal,
    closeModal,
    isTranslating: storeTranslating,
  } = useRecipeStore();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isTranslating } = useTranslatedContent();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      setTimeout(() => {
        fetchRecipesByCategory(selectedCategory);
        setIsLoading(false);
      }, 2000); //agrego el tiempo de espera para que se vea el loading un poco mas
    }
  }, [selectedCategory]);

  return (
    <>
      <HeroSection />

      <div className="relative flex flex-col items-center justify-start py-20 px-10 bg-gray-50 z-10 rounded-lg drop-shadow-md">
        <h3 className="text-2xl md:text-3xl font-medium text-emerald-500 mb-10 w-full text-center md:text-start drop-shadow-xs">
          {t('ui.selectCategory')}
        </h3>

        <FormControl sx={{ m: 1, minWidth: 200, width: '100%', maxWidth: 800 }}>
          <InputLabel id="category-select-label">{t('ui.category')}</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label={t('ui.category')}
            onChange={e => setSelectedCategory(e.target.value)}
            disabled={isTranslating}
          >
            {!categories.length || isTranslating ? (
              <MenuItem key="loading" value="loading">
                {t('ui.loading')}
              </MenuItem>
            ) : (
              categories?.map(category => (
                <MenuItem
                  key={category.strCategory}
                  value={category.originalCategory || category.strCategory}
                >
                  {category.strCategory}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </div>

      <div className="w-full bg-gray-50">
        {isLoading || isTranslating ? (
          <Backdrop
            open={isLoading || isTranslating}
            sx={{ color: '#fff', zIndex: 9999 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          recipes && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          )
        )}
      </div>

      {stateModal && <RecipeModal />}
    </>
  );
}

export default HomePage;
