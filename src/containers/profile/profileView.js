import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import profileContainer from './profileContainer';
import ProfileUpdate from './ProfileUpdate';

const ViewProfile = () => (
  <BrowserRouter>
    <div className="ViewProfile">
      <Route exact path="/profile" component={profileContainer} />
      <Route path="/user/editprofile" component={ProfileUpdate} />
    </div>
  </BrowserRouter>
);
export default ViewProfile;
