import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

function useRecipe() {
  function formatIngredient(recipe) {
    const ingredients = [];
    for (let i = 1; i <= 6; i++) {
      const ingre = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingre) {
        ingredients.push(`${ingre} - ${measure ? measure : 'a ojo'}`);
      }
    }
    return ingredients;
  }

  const location = useLocation();
  const isFavoritesPage = useMemo(() => {
    return location.pathname === '/favorites';
  }, [location.pathname]);

  return {
    formatIngredient,
    isFavoritesPage,
  };
}

export default useRecipe;
