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

  return {
    formatIngredient,
  };
}

export default useRecipe;
