import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotificationIcon from '../containers/notifications/NotificationIcon'

class SignedInLinks extends Component {
  handleLogout = () => {
    localStorage.clear();
    window.location.replace('/');
  };

  render() {
    return (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0" data-test="signedInLink">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/create">
            Create Article
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-danger" onClick={this.handleLogout} to="/">
            Sign Out
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-danger" to="/notifications">
            <NotificationIcon />
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default SignedInLinks;
