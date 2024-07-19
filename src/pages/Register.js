import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/HomePage.css';
import '../styles/register.css';

const Register = ({ users, setUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setUsers([...users, { email, password }]);
    navigate('/login');
  };

  return (
      <div className="login">
      <h1>Welcome!</h1>
      <p>Choosing Gifts More Easily</p>
      <form onSubmit={handleSubmit} className="form">

            <h2>Sign Up Here!</h2>
            
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="mb-2 mt-2 mr-2 ml-2 input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Sign Up</button>
            {error && <div className="error-message">{error}</div>}

            <div className="google">Continue with Google</div>
            <p className="sign">
              Already have an account ? <Link to="/login">Sign In</Link>
            </p>

        </form>
     </div>
  );
};

export default Register;
