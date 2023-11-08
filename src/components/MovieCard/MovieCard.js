import React from "react";

const MovieCard = ({ movie }) => {
  const { title, poster_path, overview, vote_average } = movie;

  return (
    <img
      src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
      alt={title}
      className="mb-2 rounded-lg shadow-lg h-56 w-44 object-cover"
    />
  );
};

export default MovieCard;
