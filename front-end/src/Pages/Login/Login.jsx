import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import logo from "../../assets/Logo.png"
import {FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState('password');
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const { id, ...others } = res.data;
      localStorage.setItem("userID", JSON.stringify(id));
      localStorage.setItem("user", JSON.stringify(others));
      const { role } = res.data;
      if (role === "customer") {
        navigate("/customer/products");
      }
      if (role === "seller") {
        navigate("/seller/orders");
      }
      if (role === "administrator") {
        navigate("/admin/manage");
      }
      resetValues();
    } catch (err) {
      resetValues();
      setError(err.response.data.message);
    }
  };

  const resetValues = () => {
    setEmail("");
    setPassword("");
  };


  localStorage.setItem("carrinho", JSON.stringify([]));

  const validateInputs = () => {
    const MIN_PASSWORD_LENGTH = 6;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailIsValid = emailRegex.test(email);
    if (password.length >= MIN_PASSWORD_LENGTH && emailIsValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    if (currentUser.role === "customer") {
      navigate("/customer/products");
    }
    if (currentUser.role === "seller") {
      navigate("/seller/orders");
    }
    if (currentUser.role === "administrator") {
      navigate("/admin/manage");
    }
    validateInputs();
  }, [email, password]);

  const handleView = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };  

  return (
    <div className="Login">
      <div className="Login__container">
        <div className="Login__container-left">
        </div>
        <div className="Login__container-right">
          <form onSubmit={handleSubmit}>
            <img src={logo} alt="logo" />
            <label htmlFor="email">
              Email
              <input
                data-testid="common_login__input-email"
                name="email"
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              
            </label>

            <label htmlFor="password">
              Password
              <input
              value={password}
                data-testid="common_login__input-password"
                name="password"
                type={passwordType}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='button' onClick={()=> handleView()}>{passwordType==="password" ?<FaEye/> : <FaEyeSlash/>}</button>
            </label>
            <button
              data-testid="common_login__button-login"
              type="submit"
              disabled={!isValid}
            >
              Login
            </button>
            <p
              data-testid="common_login__button-register"
              type="button"
              onClick={() => navigate("/register")}
            >
              Ainda não tenho conta ?
            </p>
            {error && (
              <p
                data-testid="common_login__element-invalid-email"
                className="error"
              >
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
