import axios from 'axios';
import { MovieApi, MovieDetails, SearchResponse } from '../types';

const API_KEY = '2c84d336';
const API_URL = 'https://www.omdbapi.com/';
const defaultSearch = 'movie';

export const fetchItems = async (term: string = '', page: number = 1): Promise<SearchResponse | null> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        s: term || defaultSearch,
        page,
        apikey: API_KEY,
      },
    });

    if (response.data.Response === 'True') {
      const totalResults = parseInt(response.data.totalResults, 10);
      const totalPages = Math.ceil(totalResults / 10); // Assuming 10 results per page
      return {
        results: response.data.Search.map((item: MovieApi) => ({
          id: item.imdbID,
          title: item.Title,
          year: item.Year,
          poster: item.Poster,
        })),
        totalPages,
      };
    } else {
      console.error('Error fetching data:', response.data.Error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
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
