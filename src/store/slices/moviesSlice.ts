import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails } from '../../types';
import { moviesApi } from '../../services/apiService';
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      moviesApi.endpoints.fetchMovieById.matchFulfilled,
      (state, action: PayloadAction<MovieDetails>) => {
        const index = state.selectedMovies.findIndex((movie) => movie.id === action.payload.id);
        if (index === -1) {
          state.selectedMovies.push(action.payload);
        } else {
          state.selectedMovies.splice(index, 1);
        }
      },
    );
  },
});

export const { setResults, setTotalPages, setActiveMovie, unselectMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
