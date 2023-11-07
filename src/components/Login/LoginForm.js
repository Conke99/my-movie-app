import React, { useState } from "react";
import { login } from "../../services/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      // TODO: display error messages
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
      <input
        className="w-full h-9 mb-8 text-lg pl-5"
        type="text"
        id="username"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />

      <input
        className="w-full h-9 mb-8 text-lg pl-5"
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />

      <button
        className="w-full bg-purple-900 h-11 text-gray-400 text-lg"
        type="submit"
      >
        Confirm
      </button>
    </form>
  );
};

export default LoginForm;
