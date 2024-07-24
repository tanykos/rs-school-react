import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';

export interface MoviesState {
  results: Movie[];
  totalPages: number;
  activeMovie: string;
  selectedMovie: Movie | null;
}

const getActiveMovieFromUrl = (): string => {
  const searchParams = new URLSearchParams(window.location.search);
  const movieId = searchParams.get('movieId');
  return movieId || '';
};

const initialState: MoviesState = {
  results: [],
  totalPages: 0,
  activeMovie: getActiveMovieFromUrl(),
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
    setActiveMovie(state, action: PayloadAction<string>) {
      state.activeMovie = action.payload;
    },
    setSelectedMovie(state, action: PayloadAction<Movie | null>) {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setResults, setTotalPages, setActiveMovie, setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
