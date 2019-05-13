import React from 'react';
import './themes/custom.scss';
import './themes/bootstrap-custom.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Home from './containers/Home';
import Signup from './containers/signup/Signup';
import SignupSuccess from './containers/signup/SignupSuccess';
import profileContainer from './containers/profile/profileContainer';
import ProfileUpdate from './containers/profile/ProfileUpdate';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/success-signup" component={SignupSuccess} />
          <Route path="/profile" component={profileContainer} />
          <Route path="/editprofile" component={ProfileUpdate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
