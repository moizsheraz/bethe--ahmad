import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/HomePage.css';
import '../styles/register.css';

const Login = ({ users, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      onLogin(user.email);
      navigate('/questions-page');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
     <div className="login">
      <h1>Welcome!</h1>
      <p>Choosing Gifts More Easily</p>
      <form onSubmit={handleSubmit} className="form">

            <h2>Login Here!</h2>
            
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
            <button type="submit">Sign In</button>
            {error && <div className="error-message">{error}</div>}

            <div className="google">Continue with Google</div>

            <p className="sign">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>

        </form>
     </div>
    </div>
  );
};

export default Login;
