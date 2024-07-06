// src/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      console.log(response.data);
      alert('Login successful');
      if (role === 'Customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/seller-dashboard');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Customer">Customer</option>
          <option value="Seller">Seller</option>
        </select>
        <button type="submit" className="login-button">Login</button>
      </form>
      <button className="google-login" onClick={handleGoogleLogin}>Login with Google</button>
      <div className="login-links">
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default Login;

