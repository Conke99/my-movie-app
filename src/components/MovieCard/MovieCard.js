import React from "react";

const MovieCard = ({ movie }) => {
  const { title, poster_path, overview, vote_average } = movie;

  return (
    <div className="">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
        className="mb-2 rounded-lg shadow-lg h-56 w-44 object-cover"
      />
      {/* <h3 className="text-lg font-semibold mb-1">{title}</h3> */}
      {/* <p className="text-sm text-gray-400 mb-2">{`Rating: ${vote_average}/10`}</p> */}
      {/* <p className="text-sm text-gray-300">{overview}</p> */}
    </div>
  );
};

export default MovieCard;
