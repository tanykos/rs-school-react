import './SearchSection.scss';
import { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useAppDispatch } from '../../hooks/redux';
import { setPage } from '../../store/slices/pageSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchSection() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm');
  const [inputValue, setInputValue] = useState(searchTerm);
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (!searchParams.get('search') && searchTerm) {
      searchParams.set('search', searchTerm);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = inputValue.trim();
    setSearchTerm(trimmedSearchTerm);
    dispatch(setPage(1));
    searchParams.set('search', trimmedSearchTerm);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  return (
    <div className="searchSection">
      <h1 className="searchSection-title">Search movies</h1>
      <form onSubmit={handleSearch} className="searchRow" data-testid="search-form">
        <input
          className="search"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a word in English..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
