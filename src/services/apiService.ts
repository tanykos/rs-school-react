import axios from 'axios';
import { Movie, MovieApi } from '../types';

const API_KEY = '2c84d336';
const API_URL = 'https://www.omdbapi.com/';
const defaultSearch = 'movie';

export const fetchItems = async (term: string = '', page: number = 1): Promise<Movie[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        s: term || defaultSearch,
        page,
        apikey: API_KEY,
      },
    });

    if (response.data.Response === 'True') {
      console.log();
      return response.data.Search.map((item: MovieApi) => ({
        id: item.imdbID,
        title: item.Title,
        year: item.Year,
        poster: item.Poster,
      }));
    } else {
      console.error('Error fetching data:', response.data.Error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
