import React from "react";

import SliderSection from "../components/SliderSection/SliderSection";
import MoviePopup from "../components/Popup/MoviePopup";
import useHomePageLogic from "../hooks/useHomePageLogic";

const HomePageContent = () => {
  const {
    genresData,
    movies,
    slideIndex,
    highlightedIndex,
    showModal,
    selectedMovie,
    sliderRef,
    sliderKey,
    setSliderKey,
    resetSlider,
  } = useHomePageLogic();

  // Function to reset the slider
  const handleResetSlider = () => {
    resetSlider();
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {genresData.genres.map((genre, index) => (
        <div key={genre.id} className="m-4 w-11/12 pl-5 h-80 ">
          <SliderSection
            key={genre.id}
            genre={genre}
            movies={movies}
            slideIndex={slideIndex}
            highlightedIndex={highlightedIndex}
            sliderRef={sliderRef}
            genresData={genresData}
            index={index}
            sliderKey={sliderKey}
          />
        </div>
      ))}
      <MoviePopup open={showModal} movie={selectedMovie} />
    </div>
  );
};

export default HomePageContent;
