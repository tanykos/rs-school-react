import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelector from './ThemeSelector';
import { ThemeContext } from '../../context/ThemeContext';

describe('ThemeSelector Component', () => {
  test('renders the ThemeSelector component', () => {
    const mockSetTheme = vi.fn();
    const theme = 'light';

    render(
      <ThemeContext.Provider value={{ theme, setTheme: mockSetTheme }}>
        <ThemeSelector />
      </ThemeContext.Provider>,
    );

    const themeSelector = screen.getByTestId('theme-selector');
    expect(themeSelector).toBeInTheDocument();

    const lightRadio = screen.getByLabelText('Light');
    const darkRadio = screen.getByLabelText('Dark');

    expect(lightRadio).toBeInTheDocument();
    expect(darkRadio).toBeInTheDocument();

    expect(lightRadio).toBeChecked();
    expect(darkRadio).not.toBeChecked();
  });

  test('calls setTheme on radio button click', () => {
    const mockSetTheme = vi.fn();
    const theme = 'light';

    render(
      <ThemeContext.Provider value={{ theme, setTheme: mockSetTheme }}>
        <ThemeSelector />
      </ThemeContext.Provider>,
    );

    const darkRadio = screen.getByLabelText('Dark');

    fireEvent.click(darkRadio);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
