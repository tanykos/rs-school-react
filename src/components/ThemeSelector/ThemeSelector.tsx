import { useContext } from 'react';
import './ThemeSelector.scss';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeSelector = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="themeSelector" data-testid="theme-selector">
      <label>
        <input type="radio" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} />
        Light
      </label>
      <label>
        <input type="radio" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
        Dark
      </label>
    </div>
  );
};

export default ThemeSelector;
