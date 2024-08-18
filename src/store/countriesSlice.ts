import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import countries from '../data/countries';

const initialState: string[] = countries;

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
