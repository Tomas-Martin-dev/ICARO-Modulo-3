import React from 'react';
import { useRecipeStore } from '../store/recipeSlice';

export default function RecipeCard({ recipe }) {
  const { fetchRecipeById } = useRecipeStore();

  return (
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={() => fetchRecipeById(recipe.idMeal)}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow duration-300 group-hover:shadow-lg">
        <div className="relative overflow-hidden">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-100 group-hover:opacity-20"></div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-150">
            {recipe.strMeal}
          </h3>
        </div>
      </div>
    </div>
  );
}
