import React from "react";

const MovieCard = ({ movie, isActive }) => {
  const { title, poster_path, overview, vote_average } = movie;

  return (
    <div className="text-white text-center">
      <div
        className={`${isActive ? "border-4 border-red-900" : ""} inline-block`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          className="rounded-lg shadow-lg h-56 w-44 object-cover"
        />
      </div>
      {isActive ? <p>{title}</p> : null}
    </div>
  );
};

export default MovieCard;
