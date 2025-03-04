import React, { createContext, useState, useEffect, useContext } from "react";

// Create a Watchlist Context
const WatchlistContext = createContext();

// Watchlist Provider Component
export const WatchlistProvider = ({ children }) => {
  // Initialize Watchlist from LocalStorage
  const [watchlist, setWatchList] = useState(() => {
    const storedWatchlist = localStorage.getItem("movieApp");

    // Make sure watchlist is always an array, even if localStorage returns null
    try {
      // Check if the stored data is valid JSON and is an array
      return storedWatchlist ? JSON.parse(storedWatchlist) : [];
    } catch (error) {
      console.error("Error parsing watchlist from localStorage", error);
      return [];
    }
  });

  // Sync LocalStorage whenever Watchlist changes
  useEffect(() => {
    // console.log(watchlist);
    if (watchlist && Array.isArray(watchlist)) {
      localStorage.setItem("movieApp", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  // Add Movie to Watchlist
  const addToWatchlist = (movie) => {
    setWatchList((prevWatchlist) => {
      const updatedWatchlist = [...prevWatchlist, movie];
      localStorage.setItem("movieApp", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  // Remove Movie from Watchlist
  const removeFromWatchlist = (movie) => {
    setWatchList((prevWatchlist) => {
      const updatedWatchlist = prevWatchlist.filter((m) => m.id !== movie.id);
      localStorage.setItem("movieApp", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, setWatchList, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

// Custom Hook to use Watchlist Context
export const useWatchlist = () => useContext(WatchlistContext);
