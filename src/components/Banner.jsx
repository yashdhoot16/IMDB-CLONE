import { React, useState, useEffect } from "react";
import Logo from "../batman.jpg";

const Banner = ({ movies }) => {
  const fallbackImage = Logo;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // 4 seconds interval

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, [movies.length]);

  const movie = movies[currentIndex];

  return (
    <div className="mt-2 bg-no-repeat relative">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            : fallbackImage
        }
        alt="Banner"
        className="w-full h-auto max-h-[40vh] xl:max-h-[85vh] object-fill"
      />
      <div className="text-xl tracking-wide absolute bottom-0 left-0 text-white font-semibold text-center w-full bg-gray-900/70">
        {movie.original_title}
      </div>
    </div>
  );
};

export default Banner;
