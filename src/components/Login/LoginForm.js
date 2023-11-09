import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import login from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      const { access_token } = data;
      localStorage.setItem("access_token", access_token);
      navigate("/home");
    } catch (error) {
      setError(error.response.data.error);
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
      <input
        className="w-full h-9 mb-8 text-lg pl-3"
        type="text"
        id="username"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />

      <input
        className="w-full h-9 mb-8 text-lg pl-3"
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />

      <button
        className="w-full bg-sky-950 h-11 text-white text-lg"
        type="submit"
      >
        Confirm
      </button>
      {error && (
        <div className="text-red-500 mt-2">
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
