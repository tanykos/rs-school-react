import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../store/slices/moviesSlice';
import pageReducer from '../store/slices/pageSlice';
import { moviesApi } from '../services/apiService';

export const mockMovie = {
  id: '1',
  title: 'Mock Movie',
  poster: '/mock-poster.jpg',
  year: '2023',
};

export const mockMovieDetails = {
  imdbID: 'tt1234567',
  Title: 'Mock Movie',
  Year: '2021',
  Genre: 'Action',
  Country: 'USA',
  Language: 'English',
  Runtime: '120 min',
  Actors: 'Actor 1, Actor 2',
  Plot: 'This is a mock movie plot.',
};

export const mockStore = configureStore({
  reducer: {
    movies: moviesReducer,
    page: pageReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
  preloadedState: {
    page: {
      currentPage: 1,
    },
    movies: {
      results: [mockMovie],
      totalPages: 5,
      activeMovie: '',
      selectedMovies: [],
    },
  },
});
