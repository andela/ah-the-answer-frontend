import React, { Component } from 'react';
import axios from 'axios';
import facebookIcon from '../../images/facebook.svg';

const fbLogin = `${process.env.REACT_APP_API}/api/users/facebook/`;

export default class FacebookLogin extends Component {
  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_KEY,
        cookie: true,
        xfbml: true,
        version: 'v3.1',
      });
    };
  }

  facebookLogin = () => {
    window.FB.login(
      (response) => {
        this.loginCallback(response);
      },
    );
  };

  loginCallback = (response) => {
    // eslint-disable-next-line no-console
    console.log(response);
    if (response.status === 'connected') {
      this.facebookAuthenticate(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
      // eslint-disable-next-line no-console
      console.log('Error occured you are unauthorized');
    } else {
      // eslint-disable-next-line no-console
      console.log('Error occured during authentication');
    }
  }

  facebookAuthenticate = (accessToken) => {
    axios.post(fbLogin, { access_token: accessToken })
      .then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.replace('/');
          }
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        },
      );
  };

  render() {
    return (
      <button id="fb" type="button" onClick={this.facebookLogin} className="btn btn-primary button-facebook ml-2 col">
        <img src={facebookIcon} alt="facebook" />
      </button>
    );
  }
}
