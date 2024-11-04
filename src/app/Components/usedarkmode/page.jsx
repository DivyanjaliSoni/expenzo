"use client";
import { useEffect, useRef } from "react";

const useDarkMode = () => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const isDarkModeRef = useRef(mediaQuery.matches); // Use ref to hold the current value

  useEffect(() => {
    const updateDarkMode = (e) => {
      isDarkModeRef.current = e.matches; // Update the ref value
    };

    // Set initial value based on media query
    isDarkModeRef.current = mediaQuery.matches;

    mediaQuery.addEventListener("change", updateDarkMode);

    return () => {
      mediaQuery.removeEventListener("change", updateDarkMode);
    };
  }, []);

  return isDarkModeRef.current; // Return the current value directly
};

export default useDarkMode;
