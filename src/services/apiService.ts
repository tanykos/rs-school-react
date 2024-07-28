import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieApi, MovieDetails, MovieDetailsApi, SearchResponse, SearchResponseApi } from '../types';
import { defaultSearch } from '../shared/constants';

const API_KEY = '2c84d336';
const API_URL = 'https://www.omdbapi.com/';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    fetchMovies: builder.query<SearchResponse, { term: string; page: number }>({
      query: ({ term = defaultSearch, page = 1 }) => ({
        url: '',
        params: {
          s: term || defaultSearch,
          page,
          apikey: API_KEY,
        },
      }),
      transformResponse: (response: SearchResponseApi): SearchResponse => {
        if (response.Response === 'True') {
          const totalResults = parseInt(response.totalResults, 10);
          const totalPages = Math.ceil(totalResults / 10);
          return {
            results: response.Search.map((item: MovieApi) => ({
              id: item.imdbID,
              title: item.Title,
              year: item.Year,
              poster: item.Poster,
            })),
            totalPages,
          };
        } else {
          return {
            results: [],
            totalPages: 0,
          };
        }
      },
    }),
    fetchMovieById: builder.query<MovieDetails, string>({
      query: (id) => ({
        url: '',
        params: {
          i: id,
          apikey: API_KEY,
        },
      }),
      transformResponse: (response: MovieDetailsApi): MovieDetails => {
        return {
          id: response.imdbID,
          title: response.Title,
          year: response.Year,
          genre: response.Genre,
          country: response.Country,
          runtime: response.Runtime,
          actors: response.Actors,
          plot: response.Plot,
          language: response.Language,
        };
      },
    }),
  }),
});
