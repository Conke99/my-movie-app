import React from "react";
import Slider from "react-slick";
import MovieCard from "../MovieCard/MovieCard";

const MovieSlider = ({ movie }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(movie, "Slider");

  return (
    <div className="w-full">
      <Slider {...settings}>
        <MovieCard key={movie.id} movie={movie} />
      </Slider>
    </div>
  );
};

export default MovieSlider;
