import React from "react";

import HomePageContent from "./HomePageContent";

const Home = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center pt-8">
        Select your movie using arrow keys on your keyboard
      </h1>
      <HomePageContent />
    </div>
  );
};

export default Home;
