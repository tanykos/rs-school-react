import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './formsDataSlice';

export const initStore = () => {
  return configureStore({
    reducer: {
      forms: formsReducer,
    },
  });
};

export type RootState = ReturnType<ReturnType<typeof initStore>['getState']>;
export type AppDispatch = ReturnType<typeof initStore>['dispatch'];
