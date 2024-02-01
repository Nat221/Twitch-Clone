import React, { useState } from "react";
import { Login } from "./Login.js";
import { Register } from "./Register.js";
import "./AuthPage.css";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleAuthPageToggle = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <div className="auth-container">
      {isLogin ? (
        <Login switchAuthHandler={handleAuthPageToggle} />
      ) : (
        <Register switchAuthHandler={handleAuthPageToggle} />
      )}
    </div>
  );
};
