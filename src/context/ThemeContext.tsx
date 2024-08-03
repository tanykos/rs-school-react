import { createContext, PropsWithChildren, useState } from 'react';
import { Theme } from '../types';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const defaultValue: ThemeContextProps = {
  theme: 'light',
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextProps>(defaultValue);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>('light');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
