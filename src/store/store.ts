import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './formsDataSlice';
import countriesReducer from './countriesSlice';

export const initStore = () => {
  return configureStore({
    reducer: {
      forms: formsReducer,
      countries: countriesReducer,
    },
  });
};

export type RootState = ReturnType<ReturnType<typeof initStore>['getState']>;
export type AppDispatch = ReturnType<typeof initStore>['dispatch'];
