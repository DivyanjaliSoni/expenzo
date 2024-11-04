"use client";
import { useEffect, useRef } from "react";

const useDarkMode = () => {
  const isDarkModeRef = useRef(false); // Use ref to hold the current value

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial value based on media query
    isDarkModeRef.current = mediaQuery.matches;

    const updateDarkMode = (e) => {
      isDarkModeRef.current = e.matches; // Update the ref value
    };

    mediaQuery.addEventListener("change", updateDarkMode);

    // Cleanup function to remove the event listener
    return () => {
      mediaQuery.removeEventListener("change", updateDarkMode);
    };
  }, []); // The effect runs only once on mount

  return isDarkModeRef.current; // Return the current value directly
};

export default useDarkMode;
