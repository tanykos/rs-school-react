import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: string = '') => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, searchTerm);
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useLocalStorage;
