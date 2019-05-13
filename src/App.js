/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './themes/custom.scss';
// eslint-disable-next-line import/no-named-as-default
import InitiatePasswordReset from './containers/PasswordReset/InitiatePasswordReset';
import ResetPasswordMessage from './containers/PasswordReset/PasswordResetSuccess';
// eslint-disable-next-line import/no-named-as-default
import ResetPassword from './containers/PasswordReset/resetPassword';
import './themes/bootstrap-custom.scss';
<<<<<<< HEAD

=======
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Home from './containers/Home';
import './themes/custom.scss';
import Signup from './containers/signup/Signup';
import SignupSuccess from './containers/signup/SignupSuccess';
>>>>>>> develop

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
<<<<<<< HEAD
          <Route exact path="/passwordreset" component={InitiatePasswordReset} />
          <Route path="/passwordresetsuccess" component={ResetPasswordMessage} />
          <Route path="/passwordreset/:token" component={ResetPassword} />
=======
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/success-signup" component={SignupSuccess} />
>>>>>>> develop
        </Switch>
      </div>
    </Router>
  );
}

export default App;
