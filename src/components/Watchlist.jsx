import React, { useEffect, useState } from "react";
import { useWatchlist } from "../WatchlistContext"; // Import the custom hook
import Logo from "../batman.jpg";
import genereIds from "../Utility/Genres";

const Watchlist = () => {
  const { watchlist, setWatchList, addToWatchlist, removeFromWatchlist } =
    useWatchlist(); // Access watchlist and remove function

  const fallbackImage = Logo;

  const [search, setSearch] = useState("");

  const [genres, setGenres] = useState(["All Genres"]);

  const [currentGenre, setCurrentGenre] = useState("All Genres");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterForGenres = (genres) => {
    setCurrentGenre(genres);
  };

  const sortInAsc = () => {
    let sortInAsc = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortInAsc]);
  };

  const sortInDes = () => {
    let sortInDes = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortInDes]);
  };

  // Setting all Genres whenever watchlist updates..
  useEffect(() => {
    let tempGenres = watchlist.map((movie) => {
      return genereIds[movie.genre_ids[0]];
    });

    tempGenres = new Set(tempGenres);
    setGenres(["All Genres", ...tempGenres]);
    console.log(tempGenres);
  }, [watchlist]);

  // Function to get the movie count for the selected genre
  const getGenreCount = (genre) => {
    return watchlist.filter((movie) => {
      return genre === "All Genres" || genereIds[movie.genre_ids[0]] === genre;
    }).length;
  };

  // Function to get the count for the currently selected genre
  const getCurrentGenreMovieCount = () => {
    return getGenreCount(currentGenre);
  };

  console.log(watchlist);

  return (
    <>
      <div className="text-black flex justify-center flex-wrap mt-5">
        {genres.map((genre) => {
          return (
            <div
              onClick={() => handleFilterForGenres(genre)}
              className={
                currentGenre == genre
                  ? "hover:cursor-pointer mx-3 mb-2 md:font-semibold text-xs md:text-sm outline-white outline-1 outline-offset-1 text-white h-[1.5rem] w-[4rem] md:w-[5rem] md:h-[2rem] flex justify-center items-center"
                  : "hover:cursor-pointer mx-3 mb-2 md:font-semibold text-xs md:text-sm bg-yellow-600 h-[1.5rem] w-[4rem] md:w-[5rem] md:h-[2rem] flex justify-center items-center"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center text-xs md:text-sm m-4">
        <input
          onChange={handleSearch}
          value={search}
          type="search"
          className="hover:cursor-pointer w-[100px] h-[20px] md:w-[150px] md:h-[30px] bg-transparent border border-white placeholder-white px-2"
          placeholder="Search Movie"
          size="sm"
        ></input>
      </div>

      <div className="px-4" style={{ overflowX: "auto" }}>
        <table className="!w-full text-xs md:text-sm text-center" size="sm">
          <thead>
            <tr>
              <th>
                Movie Name{" "}
                {currentGenre !== "All Genres" && (
                  <span>({getCurrentGenreMovieCount()})</span>
                )}
                {currentGenre === "All Genres" && (
                  <span>({getGenreCount("All Genres")})</span>
                )}
              </th>
              <th className="px-2 py-3 flex justify-center">
                <div onClick={sortInAsc} className="mr-2">
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
                <div>Ratings</div>
                <div onClick={sortInDes} className="ml-2">
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th className="px-2">Popularity</th>
              <th className="px-2">Genre</th>
              <th className="px-2"></th>
            </tr>
          </thead>
          <tbody>
            {watchlist && watchlist.length > 0 ? (
              watchlist
                .filter((movie) => {
                  if (currentGenre == "All Genres") {
                    return genres;
                  } else {
                    return genereIds[movie.genre_ids[0]] == currentGenre;
                  }
                })
                .filter((movie) => {
                  return movie.original_title
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase());
                })
                .map((movie) => (
                  <tr key={movie.id}>
                    <td className="flex items-center px-2 py-2 space-x-2">
                      <img
                        className="ml-2 h-[2.5rem] w-[2.5rem] md:h-[6rem] md:w-[6rem]"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                            : fallbackImage
                        }
                        alt=""
                      />
                      <div className="truncate w-60 text-left ml-4 text-xs md:text-sm">
                        {movie.original_title}
                      </div>
                    </td>

                    <td className="px-2 text-xs md:text-sm">
                      {movie.vote_average}
                    </td>
                    <td className="px-2 text-xs md:text-sm">
                      {movie.popularity}
                    </td>
                    <td className="px-2 text-xs md:text-sm">
                      {genereIds[movie.genre_ids[0]]}
                    </td>
                    <td
                      className="!text-red-800 cursor-pointer px-2 text-xs md:text-sm"
                      onClick={() => removeFromWatchlist(movie)}
                    >
                      Delete
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td className="py-20" colSpan="5">
                  No movies in the watchlist...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Watchlist;
