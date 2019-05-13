import React from 'react';
import './themes/bootstrap-custom.scss';
import './themes/custom.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/home/home';
import Signup from './containers/signup/Signup';
import SignupSuccess from './containers/signup/SignupSuccess';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/success-signup" component={SignupSuccess} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
