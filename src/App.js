import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Navbar from './components/Navbar';
import CreateArticle from './containers/articles/CreateArticle';
import ArticleDetails from './containers/articles/ArticleDetails';
import EditArticle from './containers/articles/EditArticle';
import './themes/bootstrap-custom.scss';

import Login from './containers/Login/Login';
import Signup from './containers/signup/Signup';
import SignupSuccess from './containers/signup/SignupSuccess';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={CreateArticle} />
          <Route exact path="/articles/:slug" component={ArticleDetails} />
          <Route path="/articles/:slug/edit" component={EditArticle} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/success-signup" component={SignupSuccess} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
