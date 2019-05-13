import React from 'react';
import './themes/custom.scss';
import './themes/bootstrap-custom.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ViewProfile from './containers/profile/profileView';


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
