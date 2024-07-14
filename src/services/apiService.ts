import axios from 'axios';
import { Movie, MovieApi, MovieDetails } from '../types';

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

export const fetchItemById = async (id: string): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        i: id || defaultSearch,
        apikey: API_KEY,
      },
    });

    if (response.data.Response === 'True') {
      return response.data;
    } else {
      console.error('Error fetching data:', response.data.Error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
