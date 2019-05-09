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


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/passwordreset" component={InitiatePasswordReset} />
          <Route path="/passwordresetsuccess" component={ResetPasswordMessage} />
          <Route path="/passwordreset/:token" component={ResetPassword} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
