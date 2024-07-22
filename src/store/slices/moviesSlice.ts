import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';

export interface MoviesState {
  results: Movie[];
  totalPages: number;
  selectedMovie: Movie | null;
}

const initialState: MoviesState = {
  results: [],
  totalPages: 0,
  selectedMovie: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setResults(state, action: PayloadAction<Movie[]>) {
      state.results = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setSelectedMovie(state, action: PayloadAction<Movie | null>) {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setResults, setTotalPages, setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
