import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AfterRegistrationPage.css';

const AfterRegistrationPage = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [error, setError] = useState('');

  const checkStrength = async () => {
    if (!password) {
      setError('Please enter the text');
      setStrength(''); // Reset the strength when the password is empty
      return;
    }
    try {
      setError('');
      console.log('Sending password to backend:', password);
      const response = await axios.post('http://localhost:8081/user/check-password-strength', password, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      console.log('Response from backend:', response.data);
      setStrength(response.data);
    } catch (error) {
      console.error('Error checking password strength:', error);
    }
  };

  const handleLogout = () => {
    // Perform any logout logic here
    window.location.href = '/'; // Redirect to the RegisterForm page
  };

  const getStrengthClass = (strength) => {
    switch (strength) {
      case 'Strong':
        return 'password-strength-strong';
      case 'Medium':
        return 'password-strength-medium';
      case 'Weak':
        return 'password-strength-weak';
      default:
        return '';
    }
  };

  return (
    <div className="after-registration-container">
      <h2 className="registration-successful">WELCOME</h2>
      <p className="after-registration-text">Please enter your text below to check its strength:</p>
      <div className="password-strength-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your text"
          className="password-strength-input"
        />
        <button onClick={checkStrength} className="check-password-button">Check Strength</button>
        {error && <p className="password-strength-result">{error}</p>}
        {strength && (
          <p className={`password-strength-result ${getStrengthClass(strength)}`}>
            Password Strength: {strength}
          </p>
        )}
      </div>
      <Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link>
    </div>
  );
};

export default AfterRegistrationPage;
