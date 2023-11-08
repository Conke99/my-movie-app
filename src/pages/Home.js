import React, { useState, useEffect } from "react";
import NukaCarousel from "nuka-carousel";
import genresData from "../genres.json";

import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await Promise.all(
          genresData.genres.map((genre) => fetchMovies(genre.id))
        );
        setMovies(moviesData);
      } catch (error) {
        // TODO: Show Error
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center pt-8">Genres</h1>
      <div className="flex flex-col justify-center items-center h-full w-full">
        {genresData.genres.map((genre, index) => (
          <div key={genre.id} className="m-4 w-full pl-5">
            <h2 className="text-xl font-bold mb-4">{genre.name}</h2>
            <NukaCarousel slidesToShow={8}>
              {movies[index]
                ?.filter((movie) => movie.genre_ids?.includes(genre.id))
                .map((movie) => {
                  console.log(JSON.stringify(movie));
                  return <MovieCard movie={movie} />;
                })}
            </NukaCarousel>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
