import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '../styles/HomePage.css';
import '../styles/register.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userInfo = {
        uid: user.uid,
        email: user.email,
      };
  
      localStorage.setItem('user-info', JSON.stringify(userInfo));
      navigate('/questions-page');
      window.location.reload();
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const userInfo = {
        uid: user.uid,
        email: user.email,
      };
  
      localStorage.setItem('user-info', JSON.stringify(userInfo));
      navigate('/questions-page');
      window.location.reload(); // Reload the page after navigation
    } catch (error) {
      setError(error.message);
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

          <button type="button" onClick={handleGoogleSignIn} className="google">
            Continue with Google
          </button>

          <p className="sign">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
