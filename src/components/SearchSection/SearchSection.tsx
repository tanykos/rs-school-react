import './SearchSection.scss';
import { fetchItems } from '../../services/apiService';
import { SearchSectionProps } from '../../types';
import ErrorThrowButton from '../ErrorThrowButton/ErrorThrowButton';
import { useCallback, useEffect, useState } from 'react';

export default function SearchSection({ onSearchResults, onLoading }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchInitialItems = useCallback(
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

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      fetchInitialItems(savedSearchTerm);
    } else {
      fetchInitialItems('');
    }
  }, [fetchInitialItems]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    try {
      onLoading(true);
      const res = await fetchItems(trimmedSearchTerm);
      localStorage.setItem('searchTerm', trimmedSearchTerm);
      onSearchResults(res);
    } catch (error) {
      console.error(error);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="searchSection">
      <h1>Search movies</h1>
      <form onSubmit={handleSearch} className="searchRow">
        <input
          className="search"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter a word in English..."
        />
        <button type="submit">Search</button>

        <ErrorThrowButton />
      </form>
    </div>
  );
}
