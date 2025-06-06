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
};

const getFromCache = text => {
  const key = getCacheKey(text);
  const cached = translationCache.get(key);

  if (cached && cached.expiry > Date.now()) {
    return cached.translation;
  }

  if (cached) {
    translationCache.delete(key);
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
    const cachedTranslation = getFromCache(text);
    if (cachedTranslation) {
      console.log('Traducción en caché');
      return cachedTranslation;
    }

    if (!text || text.trim().length === 0) {
      return text;
    }

    if (text.length > 400) {
      const chunks = splitText(text);
      const translatedChunks = await Promise.all(
        chunks.map(chunk => translateText(chunk))
      );
      const fullTranslation = translatedChunks.join(' ');
      saveToCache(text, fullTranslation);
      return fullTranslation;
    }

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
  } catch (error) {
    console.error('Error en traducción', error);
    return text;
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
