import { create } from 'zustand';
import {
  getCategories,
  getRecipesByCategory,
  getRecipeById,
} from '../services/recipes';

export const useRecipeStore = create((set, get) => ({
  stateModal: false,
  recipe: {},
  categories: [],
  recipes: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

  originalCategories: [],
  originalRecipes: [],
  originalRecipe: {},
  currentLanguage: 'en',
  isTranslating: false,

  fetchCategories: async () => {
    const response = await getCategories();
    const categories = response.meals;
    set({
      categories,
      originalCategories: categories,
    });
  },

  fetchRecipesByCategory: async category => {
    set({ recipes: [], isTranslating: true });
    const response = await getRecipesByCategory(category);
    const recipes = response.meals;
    set({
      recipes,
      originalRecipes: recipes,
      isTranslating: false,
    });
  },

  fetchRecipeById: async id => {
    set({ isTranslating: true });
    const response = await getRecipeById(id);
    const recipe = response.meals[0];
    set({
      recipe,
      originalRecipe: recipe,
      stateModal: true,
      isTranslating: false,
    });
  },

  updateTranslatedCategories: (translatedCategories, language) => {
    set({
      categories: translatedCategories,
      currentLanguage: language,
    });
  },

  updateTranslatedRecipes: (translatedRecipes, language) => {
    set({
      recipes: translatedRecipes,
      currentLanguage: language,
    });
  },

  updateTranslatedRecipe: (translatedRecipe, language) => {
    set({
      recipe: translatedRecipe,
      currentLanguage: language,
    });
  },

  restoreOriginalContent: () => {
    const state = get();
    set({
      categories: state.originalCategories,
      recipes: state.originalRecipes,
      recipe: state.originalRecipe,
      currentLanguage: 'en',
    });
  },

  setTranslating: isTranslating => {
    set({ isTranslating });
  },

  closeModal: () => {
    set({ stateModal: false, recipe: {}, originalRecipe: {} });
  },

  addToFavorites: recipe => {
    const state = get();
    const isAlreadyFavorite = state.favorites.some(
      fav => fav.idMeal === recipe.idMeal
    );

    if (!isAlreadyFavorite) {
      const newFavorites = [...state.favorites, recipe];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      set({ favorites: newFavorites });
    }
  },

  removeFromFavorites: recipeId => {
    const state = get();
    const newFavorites = state.favorites.filter(fav => fav.idMeal !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    set({ favorites: newFavorites });
  },

  isRecipeFavorite: recipeId => {
    const state = get();
    return state.favorites.some(fav => fav.idMeal === recipeId);
  },
}));
