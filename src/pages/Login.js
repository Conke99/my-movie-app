import React from "react";

import LoginForm from "../components/Login/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative h-screen bg-slate-950">
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="text-center w-96 border-4 border-white p-5 rounded-2xl  bg-neutral-900/90">
          <h1 className="text-4xl mb-10 text-white">Welcome to Movie App</h1>
          <h2 className="text-3xl font-bold mb-10 text-white">Sign In</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
