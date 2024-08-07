import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useLocalStorage = (key: string, initialValue: string = '') => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchFromUrl = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem(key) || initialValue || searchFromUrl;
  });

  useEffect(() => {
    localStorage.setItem(key, searchTerm);
    searchParams.set('search', searchTerm);
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useLocalStorage;
