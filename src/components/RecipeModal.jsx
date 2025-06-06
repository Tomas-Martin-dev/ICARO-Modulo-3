import React from 'react';
import { useRecipeStore } from '../store/recipeSlice';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useRecipe from '../hooks/useRecipe';
import { useTranslation } from '../hooks/useTranslation';

export default function RecipeModal() {
  const { recipe, closeModal, stateModal, addToFavorites, isRecipeFavorite } =
    useRecipeStore();
  const { formatIngredient } = useRecipe();
  const { t } = useTranslation();

  const isFavorite = isRecipeFavorite(recipe.idMeal);

  const handleAddToFavorites = () => {
    addToFavorites(recipe);
  };

  const { isFavoritesPage } = useRecipe();

  return (
    <Modal
      open={stateModal}
      onClose={closeModal}
      aria-labelledby="recipe-modal-title"
      aria-describedby="recipe-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
          maxWidth: 800,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'auto',
        }}
      >
        <IconButton
          onClick={closeModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 1,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
        />

        <Box sx={{ p: 3 }}>
          <Typography
            id="recipe-modal-title"
            variant="h4"
            component="h2"
            gutterBottom
          >
            {recipe.strMeal}
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 3, color: 'primary.main' }}
          >
            {t('ui.ingredients')}
          </Typography>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            {formatIngredient(recipe).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            {t('ui.instructions')}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ textAlign: 'justify', lineHeight: 1.6 }}
          >
            {recipe.strInstructions}
          </Typography>

          {!isFavoritesPage && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleAddToFavorites}
                disabled={isFavorite}
                className={`flex items-center gap-2 font-medium px-6 py-3 rounded-lg transition-colors duration-200 ${
                  isFavorite
                    ? 'bg-gray-400 text-gray-600 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                }`}
              >
                <FavoriteIcon />
                {isFavorite
                  ? t('ui.alreadyInFavorites')
                  : t('ui.addToFavorites')}
              </button>
            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
