import axios from 'axios';

const getCategories = async () => {
  try {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

const getRecipesByCategory = async category => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes byCategory:', error);
    throw error;
  }
};

const getRecipeById = async id => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe byID:', error);
    throw error;
  }
};

export { getCategories, getRecipesByCategory, getRecipeById };
