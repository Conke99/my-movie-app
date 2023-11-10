import { useState, useEffect, useRef } from "react";
import genresData from "../genres.json";

import fetchMovies from "../services/api";

const useHomePageLogic = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const sliderRef = useRef();

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
        if (slideIndex < genresData.genres.length - 1) {
          setSlideIndex((prevIndex) => prevIndex + 1);
          setHighlightedIndex(0);
        }
      } else if (e.key === "ArrowUp") {
        if (slideIndex > 0) {
          setSlideIndex((prevIndex) => prevIndex - 1);
          setHighlightedIndex(0);
        } else if (slideIndex === 0 && highlightedIndex === 0) {
          const lastSlideIndex = genresData.genres.length - 1;
          setSlideIndex(lastSlideIndex);
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

  useEffect(() => {
    document.addEventListener("keydown", handleEnterPress);

    // Cleanup the event listener when the component unmounts or changes
    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, [handleEnterPress]);

  return {
    slideIndex,
    setSlideIndex,
    movies,
    setMovies,
    highlightedIndex,
    setHighlightedIndex,
    showModal,
    setShowModal,
    selectedMovie,
    setSelectedMovie,
    sliderRef,
    handleEnterPress,
    genresData,
  };
};

export default useHomePageLogic;
