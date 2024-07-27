import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/NavBar.css";

const Navbarlist = ({ currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <button className="hamburger" onClick={toggleMenu}>
          &#9776;
        </button>

        <div className={`nav-menu ${isOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Products
          </NavLink>
          <NavLink
            to="/ai-help"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            AI help me!
          </NavLink>
          <NavLink
            to="/about"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </NavLink>
        </div>
        <div className="nav-brand">
          {!currentUser ? (
            <NavLink to="/login" className="nav-link" id="nav-sign-in">
              Sign In
            </NavLink>
          ) : (
            <div className="dropdown">
              <button className="dropbtn">
                <div className="user">{currentUser.email.charAt(0)}</div>
              </button>
              <div className="dropdown-content">
                <Link to="/gifts-Page" onClick={() => setIsOpen(false)}>
                  Manage Gifts
                </Link>
                <Link to="/questions-page" onClick={() => setIsOpen(false)}>
                  My Children
                </Link>
                <Link to="/calendar" onClick={() => setIsOpen(false)}>
                  Calendar
                </Link>
                <div className="dropdown-divider"></div>
                <Link
                  to="/login"
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbarlist;
