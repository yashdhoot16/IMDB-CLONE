import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";
import { useWatchlist } from "../WatchlistContext"; // Import the custom hook
import Banner from "./Banner";

const Movies = () => {
  // Access watchlist and functions to modify it from context
  const { watchlist, setWatchList ,addToWatchlist, removeFromWatchlist } = useWatchlist();

  const [movies, setMovies] = useState([]);

  const [pageNo, setPageNo] = useState(1);

  // Method to add movie to Watchlist and LocalStorage
  const handleAddtoWatchList = (movieObj) => {
    // addToWatchlist(movieObj);

    if (!watchlist.some((movie) => movie.id === movieObj.id)) {
      addToWatchlist(movieObj);
    }
  };

  //Method to remove movie from Watchlist and LocalStorage
  const handleRemoveFromWatchList = (movieObj) => {
    removeFromWatchlist(movieObj);
  };

  const handlePrev = () => {
    if (pageNo === 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=371d79cf2dc5ce6136025a60378e34f2&language=en-US&page=${pageNo}`
      )
      .then(function (response) {
        console.log(response.data.results);
        setMovies(response.data.results);
      });
  }, [pageNo]);

  // console.log(movies);

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      {/* Pass all movies to Banner */}
      {movies.length > 0 && <Banner movies={movies} />}

      <div className="p-4 my-2">
        <h6 className="!text-white tracking-normal !text-lg text-center !font-semibold">
          Trending Movies
        </h6>
      </div>
      <div className="flex justify-center text-xs md:text-sm mb-5">
        <input
          onChange={handleSearch}
          value={search}
          type="search"
          className="hover:cursor-pointer w-[100px] h-[20px] md:w-[150px] md:h-[30px] bg-transparent border border-white placeholder-white px-2"
          placeholder="Search Movie"
          size="sm"
        ></input>
      </div>
      <div className="flex flex-row flex-wrap justify-around">
        {movies
          .filter((movie) => {
            return movie.original_title
              .toLowerCase()
              .includes(search.toLocaleLowerCase());
          })
          .map((movieObj) => {
            return (
              <MovieCard
                key={movieObj.id}
                movieObj={movieObj}
                poster_path={movieObj.poster_path}
                name={movieObj.original_title}
                handleAddtoWatchList={handleAddtoWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                watchlist={watchlist}
              />
            );
          })}
      </div>
      <div>
        <Pagination
          pageNo={pageNo}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>
    </>
  );
};

export default Movies;
