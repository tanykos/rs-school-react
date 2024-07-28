import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './slices/pageSlice';
import moviesReducer from './slices/moviesSlice';
import { moviesApi } from '../services/apiService';

export const initStore = () => {
  return configureStore({
    reducer: {
      page: pageReducer,
      movies: moviesReducer,
      [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
  });
};

export type RootState = ReturnType<ReturnType<typeof initStore>['getState']>;
export type AppDispatch = ReturnType<typeof initStore>['dispatch'];
