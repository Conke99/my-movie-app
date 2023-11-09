import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import genresData from "../genres.json";
import fetchMovies from "../services/api";
import MovieCard from "../components/MovieCard/MovieCard";
import MoviePopup from "../components/Popup/MoviePopup";

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
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

  useEffect(() => {
    // Event handler for keyboard navigation
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        // Move to the next item in the current slider if available
        if (highlightedIndex < movies[slideIndex].length - 1) {
          setHighlightedIndex((prevIndex) => prevIndex + 1);
          // Click the 'next' button to slide to the next item
          const nextButton =
            document.querySelectorAll(".slick-next")[slideIndex];
          nextButton.click();
        } else if (slideIndex < genresData.genres.length - 1) {
          // Move to the next slider if the current slider has no more items
          setSlideIndex((prevIndex) => prevIndex + 1);
          setHighlightedIndex(0);
        }
      } else if (e.key === "ArrowLeft") {
        // Move to the previous item in the current slider if available
        if (highlightedIndex > 0) {
          setHighlightedIndex((prevIndex) => prevIndex - 1);
          // Click the 'previous' button to slide to the previous item
          const prevButton =
            document.querySelectorAll(".slick-prev")[slideIndex];
          prevButton.click();
        } else {
          // Move to the previous slider if the current slider is at the first item
          if (slideIndex > 0) {
            setSlideIndex((prevIndex) => prevIndex - 1);
            // Set highlighted index to the last item of the previous slider
            setHighlightedIndex(movies[slideIndex - 1].length - 1);
          }
        }
      } else if (e.key === "ArrowDown") {
        // Move to the next slider below if available
        if (slideIndex < genresData.genres.length - 1) {
          const nextSlideIndex = slideIndex + 1;
          // Slide to the next slider
          sliderRef.current.slickGoTo(nextSlideIndex);
          setSlideIndex(nextSlideIndex);
          setHighlightedIndex(0);
        }
      } else if (e.key === "ArrowUp") {
        // Move to the previous slider above if available
        if (slideIndex > 0) {
          const prevSlideIndex = slideIndex - 1;
          // Slide to the previous slider
          sliderRef.current.slickGoTo(prevSlideIndex);
          setSlideIndex(prevSlideIndex);
          setHighlightedIndex(0);
        }
      } else if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    // Add event listener for keydown events
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener when the component unmounts or changes
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [slideIndex, movies, highlightedIndex, genresData.genres.length]);

  const handleEnterPress = (e) => {
    if (
      e.key === "Enter" &&
      movies[slideIndex] &&
      movies[slideIndex][highlightedIndex]
    ) {
      // Set the selected movie and display the modal
      const movie = movies[slideIndex][highlightedIndex];
      setSelectedMovie(movie);
      setShowModal(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEnterPress);

    // Cleanup the event listener when the component unmounts or changes
    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, [handleEnterPress]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
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
                      ? "border-4 border-red-900"
                      : ""
                  }
                />
              ))}
            </Slider>
          </div>
        ))}
      </div>

      <MoviePopup open={showModal} movie={selectedMovie} />
    </div>
  );
};

export default Home;
