import React from 'react';
import './themes/custom.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewProfile from './containers/profile/profileView';
import './themes/bootstrap-custom.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'
import Navbar from './views/Navbar'

function App() {
  return (
    <Router>
      <div className="App">
        <ViewProfile />
      </div>
    </Router>
  );
}

export default App;
