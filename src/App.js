import React from 'react';
import logo from './logo.svg';
import './App.scss';
import './themes/custom.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'
import Navbar from './views/Navbar'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={ Home }/>
          <Route path='/login' component={ Login }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
