import React from "react";

const MovieCard = ({ movie, isActive }) => {
  const { title, backdrop_path } = movie;

  return (
    <div className="text-white text-center">
      <div
        className={`${
          isActive ? "border-4 border-red-900 rounded-lg" : ""
        } inline-block`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
          alt={title}
          className="rounded-lg shadow-lg h-56 w-44 object-cover"
        />
      </div>
      {isActive ? <p>{title}</p> : null}
    </div>
  );
};

export default MovieCard;
