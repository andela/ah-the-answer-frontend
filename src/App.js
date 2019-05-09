import React from 'react';
import './themes/custom.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InitiatePasswordReset from './containers/PasswordReset/InitiatePasswordReset';
import ResetPasswordMessage from './containers/PasswordReset/PasswordResetSuccess';
import ResetPassword from './containers/PasswordReset/resetPassword';
import './themes/bootstrap-custom.scss';
import Login from './views/Login'
import Home from './views/Home'
import Navbar from './views/Navbar'


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
