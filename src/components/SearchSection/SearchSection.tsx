import './SearchSection.scss';
import { fetchItems } from '../../services/apiService';
import { SearchSectionProps } from '../../types';
import ErrorThrowButton from '../ErrorThrowButton/ErrorThrowButton';
import { useCallback, useEffect, useState } from 'react';
import useSearchTerm from '../../hooks/useLocalStorage';

export default function SearchSection({ onSearchResults, onLoading }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useSearchTerm('searchTerm', '');
  const [inputValue, setInputValue] = useState(searchTerm);

  const fetchItemsHandler = useCallback(
    async (term: string) => {
      try {
        onLoading(true);
        const res = await fetchItems(term);
        onSearchResults(res);
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
    fetchItemsHandler(trimmedSearchTerm);
  };

  // Fetch initial items on mount
  useEffect(() => {
    fetchItemsHandler(searchTerm);
  }, [fetchItemsHandler, searchTerm]);

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
