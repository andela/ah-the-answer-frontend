import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const Navbar = () => (
  <nav className="nav">
    <div>
      <a href="/" className="brand-logo">Authors Haven</a>
      <ul className="right">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </div>
  </nav>
);

export default withRouter(Navbar);
