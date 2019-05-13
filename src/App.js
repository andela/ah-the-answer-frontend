import React from 'react';
import './themes/bootstrap-custom.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './containers/Login/Login';
import Home from './containers/Home';
import Navbar from './containers/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={ Home }/>
          <Route path='/login' component={ Login }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
