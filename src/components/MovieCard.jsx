import React from "react";
import Logo from "../batman.jpg";

const MovieCard = ({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchList,
  handleRemoveFromWatchList,
  watchlist,
}) => {
  // const isInWatchlist = watchlist.some((movie) => movie.id === movieObj.id);

  const isInWatchlist =
    Array.isArray(watchlist) &&
    watchlist.some((movie) => movie.id === movieObj.id);

  const fallbackImage = Logo;

  return (
    <div className="mb-4 px-4 relative hover:scale-110 duration-300 hover:cursor-pointer">
      <div className="relative">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : fallbackImage
          }
          alt=""
          className="h-[25vh] w-[140px] md:w-[200px] xl:h-[50vh] rounded-xl"
        />

        {isInWatchlist ? (
          <div
            onClick={() => handleRemoveFromWatchList(movieObj)}
            className="absolute top-2 right-2 bg-gray-900/60 rounded-lg"
          >
            &#10060;
          </div>
        ) : (
          <div
            onClick={() => handleAddtoWatchList(movieObj)}
            className="absolute top-2 right-2 bg-gray-900/60 rounded-lg"
          >
            &#129505;
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full bg-gray-900/60 text-center py-1 rounded-b-xl ">
          {name}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

// TBDB get movies link with API Key
// https://api.themoviedb.org/3/movie/popular?api_key=371d79cf2dc5ce6136025a60378e34f2&language=en-US&page=2
