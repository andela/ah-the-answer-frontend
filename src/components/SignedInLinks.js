import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => (
  <div data-test="signedInLink">
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/create">Create Article</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-danger" to="/">Sign Out</NavLink>
      </li>
    </ul>
  </div>
);

export default SignedInLinks;
