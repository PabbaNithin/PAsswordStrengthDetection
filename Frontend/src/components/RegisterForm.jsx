import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [registrationMessage, setRegistrationMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setRegistrationMessage('Passwords do not match.');
      return;
    }

    // Create a new object excluding the confirmPassword field
    const { confirmPassword, ...dataToSubmit } = formData;

    try {
      const response = await axios.post('http://localhost:8081/user/register', dataToSubmit);
      console.log(response.data);
      setRegistrationMessage('User registered successfully.');
      navigate('/after-registration');
    } catch (error) {
      if (error.response) {
        setRegistrationMessage(error.response.data);
      } else {
        console.error('Error occurred:', error.message);
      }
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="register-form-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="register-form-input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="register-form-input"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="register-form-input"
        />
        <button type="submit" className="register-form-button">Register</button>
        {registrationMessage && <p className="registration-message">{registrationMessage}</p>}
      </form>
      <Link to="/login">Already have an account? Log in</Link>
    </div>
  );
};

export default RegisterForm;
