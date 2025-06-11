import axios from 'axios';
const MYMEMORY_BASE_URL = 'https://api.mymemory.translated.net/get';

const translationCache = new Map();

const getCacheKey = text => {
  return `en-es-${text}`;
};

const saveToCache = (text, translation) => {
  const key = getCacheKey(text);
  translationCache.set(key, {
    translation,
    timestamp: Date.now(),
    expiry: Date.now() + 24 * 60 * 60 * 1000,
  });
  console.log(' Guardado en cache:', text.substring(0, 30) + '...');
};

const getFromCache = text => {
  const key = getCacheKey(text);
  const cached = translationCache.get(key);

  if (cached && cached.expiry > Date.now()) {
    console.log(' Cache HIT para:', text.substring(0, 30) + '...');
    return cached.translation;
  }

  if (cached) {
    console.log('Cache EXPIRADO para:', text.substring(0, 30) + '...');
    translationCache.delete(key);
  } else {
    console.log('Cache MISS para:', text.substring(0, 30) + '...');
  }

  return null;
};

const splitText = (text, maxLength = 400) => {
  if (text.length <= maxLength) {
    return [text];
  }

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const chunks = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (currentChunk.length + trimmedSentence.length + 1 <= maxLength) {
      currentChunk += (currentChunk ? '. ' : '') + trimmedSentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk + '.');
        currentChunk = trimmedSentence;
      } else {
        const words = trimmedSentence.split(' ');
        let wordChunk = '';
        for (const word of words) {
          if (wordChunk.length + word.length + 1 <= maxLength) {
            wordChunk += (wordChunk ? ' ' : '') + word;
          } else {
            if (wordChunk) chunks.push(wordChunk);
            wordChunk = word;
          }
        }
        if (wordChunk) currentChunk = wordChunk;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk + '.');
  }

  return chunks;
};

// Texto
export const translateText = async text => {
  try {
    if (!text || text.trim().length === 0) {
      return text;
    }

    const cachedTranslation = getFromCache(text);
    if (cachedTranslation) {
      console.log(
        'Traducción completa en caché para:',
        text.substring(0, 50) + '...'
      );
      return cachedTranslation;
    }

    if (text.length <= 400) {
      console.log(
        'Llamando API para texto corto:',
        text.substring(0, 30) + '...'
      );
      const params = new URLSearchParams({
        q: text,
        langpair: 'en|es',
      });

      const url = `${MYMEMORY_BASE_URL}?${params}`;

      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const data = response.data;

      if (data.responseStatus !== 200) {
        console.warn('api error:', data.responseDetails);
        return text;
      }

      const translation = data.responseData.translatedText;
      saveToCache(text, translation);
      return translation;
    }

    const chunks = splitText(text);
    console.log(
      `Traduciendo texto largo dividido en ${chunks.length} fragmentos`
    );

    const translatedChunks = await Promise.all(
      chunks.map(chunk => translateChunkDirectly(chunk))
    );

    const fullTranslation = translatedChunks.join(' ');
    saveToCache(text, fullTranslation);
    return fullTranslation;
  } catch (error) {
    console.error('Error en traducción', error);
    return text;
  }
};

const translateChunkDirectly = async chunk => {
  try {
    const cachedChunk = getFromCache(chunk);
    if (cachedChunk) {
      return cachedChunk;
    }

    console.log('Llamando API para fragmento:', chunk.substring(0, 30) + '...');
    const params = new URLSearchParams({
      q: chunk,
      langpair: 'en|es',
    });

    const url = `${MYMEMORY_BASE_URL}?${params}`;

    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    const data = response.data;

    if (data.responseStatus !== 200) {
      console.warn('api error for chunk:', data.responseDetails);
      return chunk;
    }

    const translation = data.responseData.translatedText;
    saveToCache(chunk, translation);
    return translation;
  } catch (error) {
    console.error('Error traduciendo fragmento:', error);
    return chunk;
  }
};

// Categorías
export const translateArray = async textArray => {
  try {
    const translations = await Promise.all(
      textArray.map(text => translateText(text))
    );
    return translations;
  } catch (error) {
    console.error('Error traduciendo array:', error);
    return textArray;
  }
};

// Receta
export const translateRecipe = async recipe => {
  try {
    const translationsToMake = [
      translateText(recipe.strMeal),
      translateText(recipe.strInstructions),
    ];

    const ingredientTranslations = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient && ingredient.trim()) {
        ingredientTranslations.push(translateText(ingredient));
      } else {
        ingredientTranslations.push(Promise.resolve(ingredient));
      }
    }

    const [translatedName, translatedInstructions, ...translatedIngredients] =
      await Promise.all([...translationsToMake, ...ingredientTranslations]);

    const translatedRecipe = {
      ...recipe,
      strMeal: translatedName,
      strInstructions: translatedInstructions,
    };

    for (let i = 1; i <= 20; i++) {
      const ingredientIndex = i - 1;
      if (translatedIngredients[ingredientIndex] !== undefined) {
        translatedRecipe[`strIngredient${i}`] =
          translatedIngredients[ingredientIndex];
      }
    }

    return translatedRecipe;
  } catch (error) {
    console.error('Error traduciendo:', error);
    return recipe;
  }
};

export const clearTranslationCache = () => {
  translationCache.clear();
};
