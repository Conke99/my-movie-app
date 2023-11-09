import React, { useState, useEffect, useRef } from "react";
import genresData from "../genres.json";
import fetchMovies from "../services/api";
import MovieCard from "../components/MovieCard/MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const sliderRef = useRef();

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

  // console.log(highlightedIndex, "highlightedIndex");
  // console.log(movies[slideIndex]?.length);
  // console.log(slideIndex, "slideIndex");

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        if (highlightedIndex < movies[slideIndex].length - 1) {
          setHighlightedIndex((prevIndex) => prevIndex + 1);
          const nextButton = document.querySelector(".slick-next");
          nextButton.click();
        } else if (slideIndex < genresData.genres.length - 1) {
          setSlideIndex((prevIndex) => prevIndex + 1);
          setHighlightedIndex(0);
        }
      } else if (e.key === "ArrowLeft") {
        if (highlightedIndex > 0) {
          setHighlightedIndex((prevIndex) => prevIndex - 1);
          const prevButton = document.querySelector(".slick-prev");
          prevButton.click();
        } else {
          if (slideIndex > 0) {
            setSlideIndex((prevIndex) => prevIndex - 1);
            setHighlightedIndex(movies[slideIndex - 1].length - 1);
          }
        }
      } else if (e.key === "ArrowDown") {
        setSlideIndex((slideIndex) =>
          slideIndex < genresData.genres.length - 1
            ? slideIndex + 1
            : slideIndex
        );
        setHighlightedIndex(0);
      } else if (e.key === "ArrowUp") {
        setSlideIndex((slideIndex) =>
          slideIndex > 0 ? slideIndex - 1 : slideIndex
        );
        setHighlightedIndex(0);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [slideIndex, movies, highlightedIndex, genresData.genres.length]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center pt-8">Genres</h1>
      <div className="flex flex-col justify-center items-center h-full w-full">
        {genresData.genres.map((genre, index) => (
          <div key={genre.id} className="m-4 w-11/12 pl-5">
            <h2 className="text-xl font-bold mb-4">{genre.name}</h2>

            <Slider ref={sliderRef} {...sliderSettings} key={index}>
              {movies[index]?.map((movie, movieIndex) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  className={
                    index === slideIndex && movieIndex === highlightedIndex
                      ? "border-2 border-white"
                      : ""
                  }
                />
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
