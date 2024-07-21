import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, firestore, googleProvider } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/HomePage.css';
import '../styles/register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        children: [], // Initialize children array
        createdAt: Date.now(),
      });

      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user data to Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        children: [], // Initialize children array
        createdAt: Date.now(),
      });

      const userInfo = {
        uid: user.uid,
        email: user.email,
      };

      localStorage.setItem('user-info', JSON.stringify(userInfo));
      navigate('/questions-page');
    } catch (error) {
      setError(error.message);
    }
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

        <button type="button" onClick={handleGoogleSignIn} className="google">
          Continue with Google
        </button>

        <p className="sign">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
