import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails } from '../../types';

export interface MoviesState {
  results: Movie[];
  totalPages: number;
  activeMovie: string;
  selectedMovies: MovieDetails[];
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
  selectedMovies: [],
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
    unselectMovies(state) {
      state.selectedMovies = [];
    },
    deleteMovieById(state, action: PayloadAction<string>) {
      const index = state.selectedMovies.findIndex((movie) => movie.id === action.payload);
      state.selectedMovies.splice(index, 1);
    },
    addMovieDetails(state, action: PayloadAction<MovieDetails>) {
      state.selectedMovies.push(action.payload);
    },
  },
});

export const { setResults, setTotalPages, setActiveMovie, unselectMovies, deleteMovieById, addMovieDetails } =
  moviesSlice.actions;
export default moviesSlice.reducer;
