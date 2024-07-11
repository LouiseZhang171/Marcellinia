import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // 使用命名导入
import './Login.css';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        emailOrUsername,
        password
      });
      console.log(response.data);
      alert('Login successful');
      const userRole = response.data.user.role;
      if (userRole === 'customer') {
        navigate('/customer-dashboard');
      } else if (userRole === 'seller') {
        navigate('/seller-dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        alert('Login failed: ' + error.response.data.message);
      } else {
        alert('Login failed: ' + error.message);
      }
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token);

    try {
      const res = await axios.post('http://localhost:5000/google-login', {
        token,
        user: decoded
      });
      console.log(res.data);
      alert('Google login successful');
      const userRole = res.data.user.role;
      if (userRole === 'customer') {
        navigate('/customer-dashboard');
      } else if (userRole === 'seller') {
        navigate('/seller-dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Google login failed: ' + error.message);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
    alert('Google login failed');
  };

  return (
    <GoogleOAuthProvider clientId="557815993203-g9538buakr0jptlgm1mmrpf9qf9cnrfg.apps.googleusercontent.com">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />
        <div className="login-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
