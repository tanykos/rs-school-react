import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useLocalStorage = (key: string, initialValue: string = '') => {
  let searchFromUrl: string;
  const location = useLocation();

  if (!initialValue) {
    const searchParams = new URLSearchParams(location.search);
    searchFromUrl = searchParams.get('search') || '';
  }

  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem(key) || initialValue || searchFromUrl;
  });

  useEffect(() => {
    localStorage.setItem(key, searchTerm);
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useLocalStorage;
