import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import authStatus from '../helpers/authStatus';
import Search from '../containers/search/Search';
import Logo from '../images/logo.png';

const Navbar = () => {
  const links = authStatus() ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <NavLink className="navbar-brand" to="/">
          <img alt="logo" className="logo mr-2" src={Logo} />
          Authors Haven
        </NavLink>
        { links }
        <button type="button" className="btn btn-link nav-link text-dark" data-toggle="modal" data-target="#searchModal">
          <FontAwesomeIcon icon="search" />
        </button>
      </div>

      <Search />
    </nav>
  );
};

export default withRouter(Navbar);
