import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => (
  <ul className="navbar-nav ml-auto mt-2 mt-lg-0" data-test="signedInLink">
    <li className="nav-item">
      <NavLink className="nav-link" to="/">Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/create">Create Article</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link text-danger" to="/">Sign Out</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/profile"><i className="fas fa-user-alt" /></NavLink>
    </li>
  </ul>
);

export default SignedInLinks;
