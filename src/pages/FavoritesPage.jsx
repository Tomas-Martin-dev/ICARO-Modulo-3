import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Backdrop,
  CircularProgress,
  Container,
  Paper,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useRecipeStore } from '../store/recipeSlice';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import { useTranslation } from '../hooks/useTranslation';
import { useTranslatedContent } from '../hooks/useTranslatedContent';

function FavoritesPage() {
  const {
    favorites,
    removeFromFavorites,
    stateModal,
    fetchRecipeById,
    isTranslating: storeTranslating,
  } = useRecipeStore();

  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isTranslating } = useTranslatedContent();

  const handleRemoveFromFavorites = (recipeId, event) => {
    event.stopPropagation(); // Evita que se abra el modal
    removeFromFavorites(recipeId);
  };

  const handleRecipeClick = async recipe => {
    setIsLoading(true);
    await fetchRecipeById(recipe.idMeal);
    setIsLoading(false);
  };

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <div className="pt-20">
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 3,
            }}
          >
            <FavoriteIcon
              sx={{
                fontSize: 80,
                color: 'text.secondary',
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'emerald.600',
                mb: 2,
              }}
            >
              {t('ui.favorites')}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 2 }}
            >
              {t('ui.noFavorites')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('ui.addSomeRecipes')}
            </Typography>
          </Paper>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <div className="pt-20">
        {/* Header de la página */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'emerald.600',
              textAlign: 'center',
              mb: 2,
            }}
          >
            {t('ui.favorites')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            {favorites.length}{' '}
            {favorites.length === 1 ? 'receta favorita' : 'recetas favoritas'}
          </Typography>
        </Box>

        {/* Grid de recetas favoritas */}
        <div className="w-full bg-gray-50">
          {isLoading || isTranslating ? (
            <Backdrop
              open={isLoading || isTranslating}
              sx={{ color: '#fff', zIndex: 9999 }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
              {favorites.map(recipe => (
                <div key={recipe.idMeal} className="relative">
                  {/* Botón para quitar de favoritos */}
                  <IconButton
                    onClick={e => handleRemoveFromFavorites(recipe.idMeal, e)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 10,
                      backgroundColor: 'rgba(239, 68, 68, 0.9)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(220, 38, 38, 1)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease',
                      width: 36,
                      height: 36,
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>

                  {/* Card de la receta */}
                  <div onClick={() => handleRecipeClick(recipe)}>
                    <RecipeCard recipe={recipe} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de receta */}
        {stateModal && <RecipeModal />}
      </div>
    </Container>
  );
}

export default FavoritesPage;
