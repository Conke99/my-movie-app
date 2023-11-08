import React from "react";
import NukaCarousel from "nuka-carousel";

const NukaCarousel = ({ children }) => {
  return <NukaCarousel slidesToShow={8}>{children}</NukaCarousel>;
};

export default NukaCarousel;
