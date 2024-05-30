import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/user/login', formData);
      console.log(response.data);
      setLoginMessage('Login successful.');
      // Redirect user to the previous page or the specified default page
      navigate(location.state?.from || '/after-registration');
    } catch (error) {
      if (error.response) {
        setLoginMessage(error.response.data);
      } else {
        console.error('Error occurred:', error.message);
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="login-form-input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="login-form-input"
        />
        <button type="submit" className="login-form-button">Login</button>
        {loginMessage && <p className="login-message">{loginMessage}</p>}
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default LoginForm;
