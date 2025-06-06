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
      <div className="min-h-[80vh] lg:min-h-dvh lg:flex xl:items-center py-16 px-4 lg:p-16 relative mb-28">
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
          className="absolute top-7/12 md:top-1/2 select-none -translate-y-1/2 w-full h-auto right-[-10vw] z-0 pointer-events-none scale-125 md:scale-125 lg:scale-100"
        />
      </div>
      {/* mover a components ya que es heroSection */}

      <div className="relative flex flex-col items-center justify-start py-20 px-10 bg-gray-50 z-10 rounded-lg drop-shadow-md mb-10">
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

      <div className="w-full mb-52">
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
