import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import logo from "../../assets/Logo.png"
import {FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordTypeC, setPasswordTypeC] = useState('password');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== passwordConfirm) {
      setError('As senhas não coincidem');
      return;
    }
    try {
      await axios.post(
        'http://localhost:3001/register',
        {
          name,
          email,
          password,
          role: 'customer',
        },
      );
      const res = await axios.post(
        'http://localhost:3001/login',
        {
          email,
          password,
        },
      );
      const { id, ...others } = res.data;
      localStorage.setItem("userID", JSON.stringify(id));
      localStorage.setItem("user", JSON.stringify(others));
      navigate('/customer/products');
    } catch (err) {
      setError(err.response.data.message);
      resetValues();
    }
  };

  const validateInputs = () => {
    const MIN_PASSWORD_LENGTH = 6;
    const MIN_NAME = 12;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailIsValid = emailRegex.test(email);
    if (
      password.length >= MIN_PASSWORD_LENGTH
      && emailIsValid
      && passwordConfirm >= MIN_PASSWORD_LENGTH
      && name.length >= MIN_NAME
    ) {
      setIsValid(true);
    }
  };

  const resetValues = () => {
    setEmail("");
    setPassword("");
    setName("");
    setPasswordConfirm("");
  };

  const handleView = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };

  const handleViewC = () => {
    if (passwordTypeC === 'password') {
      setPasswordTypeC('text');
    } else {
      setPasswordTypeC('password');
    }
  };

  useEffect(() => {
    validateInputs();
  }, [email, password, name]);

  return (
    <div className="Register">
      <form onSubmit={ handleSubmit } className="Register__container">
      <img src={logo} alt="logo" />

        <label htmlFor="nome">
          Nome:
          <input
            data-testid="common_register__input-name"
            name="nome"
            type="text"
            placeholder="Seu nome"
            value={ name}
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="common_register__input-email"
            name="email"
            type="email"
            placeholder="email"
            value={ email}
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="passowrd">
          Password:
          <input
            data-testid="common_register__input-password"
            name="password"
            type={passwordType}
            value={ password}
            onChange={ (e) => setPassword(e.target.value) }
          />
          <button type='button' onClick={()=> handleView()}>{passwordType==="password" ?<FaEye/> : <FaEyeSlash/>}</button>
        </label>
        <label htmlFor="passowrd">
           Confirm Password:
          <input
            data-testid="common_register__input-password"
            name="password-confirm"
            type={passwordTypeC}
            value={ passwordConfirm}
            onChange={ (e) => setPasswordConfirm(e.target.value) }
          />
            <button type='button' onClick={()=> handleViewC()}>{passwordTypeC==="password" ?<FaEye/> : <FaEyeSlash/>}</button>
        </label>
        <button
          data-testid="common_register__button-register"
          type="submit"
          disabled={ !isValid }
        >
          Cadastrar
        </button>
        <p
              data-testid="common_login__button-register"
              type="button"
              onClick={() => navigate("/login")}
            >
              Já possui conta ?
            </p>

        {error && (
          <p
            data-testid="common_register__element-invalid_register"
            className="error"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;
