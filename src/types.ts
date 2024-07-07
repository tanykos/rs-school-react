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

export interface SearchSectionProps {
  onSearchResults: (results: Movie[]) => void;
  onLoading: (loading: boolean) => void;
}

export interface SearchComponentState {
  searchTerm: string;
  loading: boolean;
}

export interface AppState {
  results: Movie[];
  loading: boolean;
}
