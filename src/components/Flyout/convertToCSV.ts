import { MovieDetails } from '../../types';

export const convertToCSV = (movies: MovieDetails[]): string => {
  const headers = ['ID', 'Title', 'Year', 'Genre', 'Country', 'Runtime', 'Actors', 'Plot', 'Language'];
  const rows = movies.map((movie) => [
    movie.id,
    movie.title,
    movie.year,
    movie.genre,
    movie.country,
    movie.runtime,
    movie.actors,
    movie.plot,
    movie.language,
  ]);

  return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(';')).join('\n');
};

export const createCSVDownloadURL = (csvContent: string): string => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
};
