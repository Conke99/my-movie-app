import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

const MoviePopup = ({ open, movie }) => {
  return (
    <Dialog.Root open={open} defaultOpen={open}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-neutral-900/90 
        backdrop-blur-sm 
        fixed 
        inset-0"
        />
        <Dialog.Content
          className="
        fixed 
        drop-shadow-md 
        border 
        border-neutral-700 
        top-[50%] 
        left-[50%] 
        max-h-full 
        h-full 
        md:h-auto 
        md:max-h-[85vh] 
        w-full 
        md:w-[90vw] 
        md:max-w-[800px] 
        translate-x-[-50%] 
        translate-y-[-50%] 
        rounded-md 
        bg-neutral-800 
        p-[25px] 
        focus:outline-none
    "
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                alt={movie?.title}
                className="mb-2 rounded-lg shadow-lg h-56 w-44 object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 text-white">
              <Dialog.Title className="text-xl font-bold mb-4">
                {movie?.title}
              </Dialog.Title>
              <Dialog.Description className="mb-5 text-sm leading-normal">
                {movie?.overview}
              </Dialog.Description>
              <p className="text-sm font-bold">
                Vote Average: {movie.vote_average}
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MoviePopup;
