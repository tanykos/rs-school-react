import './SearchSection.scss';
import { fetchItems } from '../../services/apiService';
import { SearchSectionProps } from '../../types';
import ErrorThrowButton from '../ErrorThrowButton/ErrorThrowButton';
import { useCallback, useEffect, useState } from 'react';
import useSearchTerm from '../../hooks/useLocalStorage';

export default function SearchSection({ onSearchResults, onLoading, setPage, currentPage }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useSearchTerm('searchTerm', '');
  const [inputValue, setInputValue] = useState(searchTerm);

  const fetchItemsHandler = useCallback(
    async (term: string, page: number = 1) => {
      try {
        onLoading(true);
        const response = await fetchItems(term, page);
        if (response) {
          onSearchResults({ results: response.results, totalPages: response.totalPages });
        } else {
          onSearchResults({ results: [], totalPages: 0 });
        }
      } catch (error) {
        console.error('Error fetching initial items:', error);
      } finally {
        onLoading(false);
      }
    },
    [onLoading, onSearchResults],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = inputValue.trim();
    setSearchTerm(trimmedSearchTerm);
    setPage(1);
    fetchItemsHandler(trimmedSearchTerm, 1);
  };

  useEffect(() => {
    fetchItemsHandler(searchTerm, currentPage);
  }, [currentPage, fetchItemsHandler, searchTerm]);

  return (
    <div className="searchSection">
      <h1>Search movies</h1>
      <form onSubmit={handleSearch} className="searchRow">
        <input
          className="search"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a word in English..."
        />
        <button type="submit">Search</button>

        <ErrorThrowButton />
      </form>
    </div>
  );
}
