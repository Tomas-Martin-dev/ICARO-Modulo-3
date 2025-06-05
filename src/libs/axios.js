import axios from 'axios';

const api = axios.create({
  method: 'GET',
  baseURL: 'https://gustar-io-deutsche-rezepte.p.rapidapi.com/search_api',
  params: { text: 'pollo' },
  headers: {
    'x-rapidapi-key': '51d0fd5117mshfffbc596615aa5dp1df043jsn31c155af7f3c',
    'x-rapidapi-host': 'gustar-io-deutsche-rezepte.p.rapidapi.com',
  },
});

export default api;
