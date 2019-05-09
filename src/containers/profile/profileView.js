import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import profileContainer from './profileContainer';
import ProfileUpdate from '../../components/ProfileUpdate';

// eslint-disable-next-line react/prefer-stateless-function
class ViewProfile extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="ViewProfile">
          <Route exact path="" component={profileContainer} />
          <Route path="/user/editprofile" component={ProfileUpdate} />
        </div>
      </BrowserRouter>
    );
  }
}
export default ViewProfile;
