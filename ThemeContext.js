// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = {
    dark: isDarkMode,
    colors: {
      background: isDarkMode ? '#121212' : '#f5f7fa',
      card: isDarkMode ? '#1e1e1e' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#1e3d59',
      subText: isDarkMode ? '#b0bec5' : '#576574',
      border: isDarkMode ? '#2c2c2c' : '#dcdde1',
      primary: '#17b978',
    },
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);