import React from 'react';
import './themes/custom.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './containers/SignIn';
import Home from './containers/Home';
import Navbar from './components/Navbar';
import CreateArticle from './containers/articles/CreateArticle';
import ArticleDetails from './containers/articles/ArticleDetails';
import EditArticle from './containers/articles/EditArticle';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/create" component={CreateArticle} />
          <Route exact path="/articles/:slug" component={ArticleDetails} />
          <Route path="/articles/:slug/edit" component={EditArticle} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
