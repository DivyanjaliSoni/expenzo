"use client"
import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Update state based on the media query
    const updateDarkMode = (e) => {
      setIsDarkMode(e.matches);
    };

    // Set the initial value
    setIsDarkMode(mediaQuery.matches);

    // Add event listener
    mediaQuery.addEventListener('change', updateDarkMode);

    // Cleanup the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', updateDarkMode);
    };
  }, []);

  return isDarkMode;
};

export default useDarkMode;
