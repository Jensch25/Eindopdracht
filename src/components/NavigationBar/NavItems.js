import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavItems = () => {
  return (
    <div className="nav-links side-nav">
    <Link to="/" className="nav-item">
      Home
    </Link>
    <Link to="/about" className="nav-item">
      About
    </Link>
    <Link to="/planner" className="nav-item">
      Recipe planner
    </Link>
    <Link to="/contact" className="nav-item">
      Contact
    </Link>
  </div>
  )
};

export default NavItems;
