/* eslint-disable import/no-named-as-default-member */
// eslint-disable-next-line import/no-named-as-default
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import './themes/bootstrap-custom.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Bootstrap JS
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';
import InitiatePasswordReset from './containers/PasswordReset/InitiatePasswordReset';
import ResetPasswordMessage from './containers/PasswordReset/PasswordResetSuccess';
import ResetPassword from './containers/PasswordReset/resetPassword';
import Login from './containers/Login/Login';
import Home from './containers/Home';
import Navbar from './components/Navbar';
import CreateArticle from './containers/articles/CreateArticle';
import ArticleDetails from './containers/articles/ArticleDetails';
import EditArticle from './containers/articles/EditArticle';
import Signup from './containers/signup/Signup';
import SignupSuccess from './containers/signup/SignupSuccess';
import profileContainer from './containers/profile/profileContainer';
import ProfileUpdate from './containers/profile/ProfileUpdate';
import NotificationList from './containers/notifications/NotificationList';
import NotificationDetails from './containers/notifications/NotificationDetails';


library.add(faThumbsUp, faThumbsDown, faSearch);
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/passwordreset" component={InitiatePasswordReset} />
          <Route path="/passwordresetsuccess" component={ResetPasswordMessage} />
          <Route path="/passwordreset/:token" component={ResetPassword} />
          <Route exact path="/" component={Home} />
          <Route path="/create" component={CreateArticle} />
          <Route exact path="/articles/:slug" component={ArticleDetails} />
          <Route path="/articles/:slug/edit" component={EditArticle} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/success-signup" component={SignupSuccess} />
          <Route path="/profile" component={profileContainer} />
          <Route path="/editprofile" component={ProfileUpdate} />
          <Route exact path="/notifications" component={NotificationList} />
          <Route path="/notifications/:id" component={NotificationDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
