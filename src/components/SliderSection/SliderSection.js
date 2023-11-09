import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MovieCard from "../MovieCard/MovieCard";

const SliderSection = ({
  movies,
  index,
  slideIndex,
  highlightedIndex,
  sliderRef,
  genresData,
}) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  return (
    <div key={index} className="m-4 w-11/12 pl-5">
      <h2 className="text-xl font-bold mb-4">
        {genresData?.genres[index]?.name}
      </h2>

      <Slider ref={sliderRef} {...sliderSettings}>
        {movies[index]?.map((movie, movieIndex) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isActive={index === slideIndex && movieIndex === highlightedIndex}
          />
        ))}
      </Slider>
    </div>
  );
};

export default SliderSection;
