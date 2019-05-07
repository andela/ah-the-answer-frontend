import React, { Component } from "react";
import GoogleIcon from "../../images/google.svg";
import axios from "axios";
import { createSocket } from "dgram";

const glogin = `${process.env.REACT_APP_API}/api/users/google/`;

class GoogleLogin extends Component {
  componentDidMount() {
    this.createElements();
  }

  createElements = () => {
    // Create the script tag to import google SDK
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = true;
    e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)

  }
  googleLogin = () => {
    window.gapi.auth.signIn({
      callback: function (authResponse) {
        this.googleSignInCallback(authResponse)
      }.bind(this),
      clientid: process.env.REACT_APP_GOOGLE_ID, //Google client Id
      cookiepolicy: "single_host_origin",
      requestvisibleactions: "http://schema.org/AddAction",
      scope: "https://www.googleapis.com/auth/plus.login email"
    });
  }
  googleSignInCallback = (e) => {
    if (e["status"]["signed_in"]) {
      window.gapi.client.load("plus", "v1", function () {
        if (e["id_token"]) {
          this.getUserDetails(e["id_token"])
        } else if (e["error"]) {
          console.log('Error occured during authentication')
        }
      }.bind(this));
    } else {
      console.log('Oops... Error service might be unavailable')
    }
  }
  getUserDetails = idToken => {
    console.log(idToken)
    axios.post(glogin, {
      "access_token": idToken
    })
      .then(
        res => {
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.replace('/');
          }
        }
      );
  }

  render() {
    return (
      <button type="button" onClick={this.googleLogin} className="btn btn-danger button-gmail ml-2 col">
        <img src={GoogleIcon} alt="google" />
      </button>
    )
  }
}

export default GoogleLogin;
