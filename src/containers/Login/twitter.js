import React, { Component } from 'react';
import TwitterIcon from '../../images/twitter.svg';
import axios from 'axios';
const twitterURL = `${process.env.REACT_APP_API}/api/users/twitter/`;
class TwitterLogin extends Component {
  componentDidMount() {
    this.createElements();

  }
  createElements = ()=>{
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
  }
  twitterLogin = () => {
    window.OAuth.initialize(process.env.REACT_APP_TWITTER_KEY);
    window.OAuth.popup('twitter').then( (twitter)=>{
      axios.post(twitterURL, {
        'access_token' : `${twitter['oauth_token']} ${twitter['oauth_token_secret']}`
      }).then(
        res => {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          window.location.replace('/');
        }
      )
    })
  }
  render() {
    return (
      <button type="button" onClick={this.twitterLogin} className="btn btn-info button-twitter ml-2 mr-2 col" >
        <img src={TwitterIcon} alt="twitter" />
      </button>
    )
  }
}
export default TwitterLogin;
