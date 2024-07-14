export interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

export interface MovieApi {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface SearchResponse {
  results: Movie[];
  totalPages: number;
}

export interface MovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Genre: string;
  Country: string;
  Runtime: string;
  Actors: string;
  Plot: string;
  Language: string;
}

export interface SearchSectionProps {
  onSearchResults: (results: { results: Movie[]; totalPages: number }) => void;
  onLoading: (loading: boolean) => void;
  setPage: (p: number) => void;
  currentPage: number;
}
