import React from "react";

import LoginForm from "../components/Login/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative h-screen bg-neutral-900/90">
      {/* <img
        src="/LoginPageImg/mountain.jpg"
        alt="login background"
        className="absolute object-cover w-full h-full"
      /> */}
      <h1>Welcome to my Movie-App</h1>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="text-center w-96">
          <h2 className="text-3xl font-bold mb-10 text-white">Sign In</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
