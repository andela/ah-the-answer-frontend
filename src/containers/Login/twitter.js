import React, { Component } from 'react';
import axios from 'axios';
import TwitterIcon from '../../images/twitter.svg';


const twitterURL = `${process.env.REACT_APP_API}/api/users/twitter/`;

class TwitterLogin extends Component {
 
  twitterLogin = () => {
    window.OAuth.initialize(process.env.REACT_APP_TWITTER_KEY);
    window.OAuth.popup('twitter').then((twitter) => {
      axios.post(twitterURL, {
        access_token: `${twitter.oauth_token} ${twitter.oauth_token_secret}`,
      }).then(
        (res) => {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          window.location.replace('/');
        },
      );
    });
  }

  render() {
    return (
      <button type="button" onClick={this.twitterLogin} className="btn btn-info button-twitter ml-2 mr-2 col">
        <img src={TwitterIcon} alt="twitter" />
      </button>
    );
  }
}

export default TwitterLogin;
