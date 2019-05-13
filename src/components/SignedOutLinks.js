import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => (
  <div data-test="signedOutLink">
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signin">Sign In</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
      </li>
    </ul>
  </div>
);

export default SignedOutLinks;
