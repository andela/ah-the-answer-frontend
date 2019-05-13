import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import authStatus from '../helpers/authStatus';

const Navbar = () => {
  const links = authStatus() ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <NavLink className="navbar-brand" to="/">Authors Haven</NavLink>
        { links }
        <button type="button" className="btn btn-link nav-link" data-toggle="modal" data-target="#searchModal">
          <FontAwesomeIcon icon="search" />
        </button>
      </div>

      <div className="modal fade" id="searchModal" tabIndex="-1" role="dialog" aria-labelledby="searchModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <form className="w-100 mb-4">
                <div className="form-group">
                  <input type="search" className="form-control" id="searchID" aria-describedby="searchHelp" placeholder="Search here" autoFocus/>
                  <span id="searchHelp" className="form-text text-white">
                    Enter a query and press
                    <q>enter</q>
                    or
                    <q>esc</q>
                    to exit
                  </span>
                </div>
              </form>
            </div>
            <div className="modal-body p-0">
              <h2 className="text-center p-2 w-100 bg-light sticky-top">Results</h2>
              <div className="card mb-2 mx-4 shadow">
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
