// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = {
    dark: isDarkMode,
    colors: {
      background: isDarkMode ? '#0d1117' : '#f8fafc',
      card: isDarkMode ? '#161b22' : '#ffffff',
      text: isDarkMode ? '#f0f6fc' : '#0f172a',
      subText: isDarkMode ? '#8b949e' : '#64748b',
      border: isDarkMode ? '#30363d' : '#e2e8f0',
      primary: '#10b981', // Modern Emerald Green
      primaryLight: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5',
      accent: '#3b82f6',
    },
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);