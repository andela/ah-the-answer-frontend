import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const Navbar = () => (
  <nav className="nav">
    <div className="container">
      <a href="/" className="brand-logo">Authors Haven</a>
      <ul className="right">
        <li><NavLink to="/">Home</NavLink></li>
      </ul>
    </div>
  </nav>
);

export default withRouter(Navbar);
