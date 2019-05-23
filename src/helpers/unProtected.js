import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const Authenticate = (user) => {
  return !!(user && user.token);
};
export const UnProtectedRoute = ({ component: Component, ...props }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = Authenticate(user);
  return (
    <Route
      {...props}
      render={() => (!isLoggedIn ? <Component {...props} /> : <Redirect to="/profile" />)}
    />
  );
};
export default UnProtectedRoute;
