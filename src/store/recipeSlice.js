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
}));
