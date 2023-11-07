import React, { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";
import genresData from "../genres.json";
import MovieCard from "../components/MovieCard/MovieCard";
import MovieSlider from "../components/MovieSlider/MovieSlider";

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
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, []);

  console.log(movies, "movies");

  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center pt-8">Genres</h1>
      <div className="flex flex-col justify-center items-center h-full w-full">
        {genresData.genres.map((genre, index) => (
          <div key={genre.id} className="m-4 w-full pl-5">
            <h2 className="text-xl font-bold mb-4">{genre.name}</h2>
            <div className="grid grid-cols-9 gap-1">
              {movies[index]
                .filter((movie) => movie.genre_ids?.includes(genre.id))
                .map((movie) => (
                  <MovieSlider key={movie.id} movie={movie} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
