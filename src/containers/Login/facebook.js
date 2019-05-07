import React, { Component } from 'react';
import facebookIcon from '../../images/facebook.svg';
import axios from 'axios';
const fbLogin = `${process.env.REACT_APP_API}/api/users/facebook/`;

export default class FacebookLogin extends Component {
  componentDidMount() {
    var t = document.getElementsByTagName("script")[0];
    if (document.getElementById('facebook-jssdk')) return;
    var f = document.createElement("script");
    f.id = "facebook-jssdk";
    f.src = "https://connect.facebook.net/en_US/sdk.js";
    t.parentNode.insertBefore(f, t);

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_KEY,
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      })
    }
  }
  facebookLogin = () => {
    window.FB.login(
      function (response) {
        this.loginCallback(response);
      }.bind(this));
  }
  loginCallback = (response) => {
    console.log(response);
    if (response.status === 'connected') {
      this.facebookAuthenticate(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
      console.log("Error occured you are unauthorized");
    } else {
      console.log("Error occured during authentication");
    }
  }
  facebookAuthenticate = (access_token) => {
    axios.post(fbLogin, { access_token })
      .then(
        res => {
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.replace('/');
          }
        },
        error => {
          console.log(error);
        }
      )
  }

  render() {
    return (
      <button type="button" onClick={this.facebookLogin} className="btn btn-primary button-facebook ml-2 col">
        <img src={facebookIcon} alt="facebook" />
      </button>
    );
  };
}