import React, { useState, useEffect } from "react";

const MovieCard = ({ movie, className }) => {
  const { title, poster_path, overview, vote_average } = movie;

  return (
    <img
      src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
      alt={title}
      className={`mb-2 rounded-lg shadow-lg h-56 w-44 object-cover ${className} `}
    />
  );
};

export default MovieCard;
