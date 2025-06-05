import api from '../libs/axios';

const getRecipes = async text => {
  try {
    const response = await api.get('/search_api', {
      params: { text },
    });
    console.log('✅ Recetas obtenidas:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener recetas:', error.message);

    if (error.response?.status === 403) {
      console.error('🔒 Error 403: API key inválida o sin permisos');
      throw new Error(
        'No tienes autorización para acceder a esta API. Verifica tu API key.'
      );
    }

    if (error.response?.status === 429) {
      console.error('⏰ Error 429: Demasiadas peticiones');
      throw new Error(
        'Has excedido el límite de peticiones. Espera un momento antes de intentar de nuevo.'
      );
    }

    throw error;
  }
};

export { getRecipes };
