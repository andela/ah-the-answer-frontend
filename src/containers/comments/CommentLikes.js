import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import authHeader from '../../helpers/authHeader';
import authUser from '../../helpers/authUser';

const config = {
  headers: authHeader(),
};

class CommentLikes extends Component {
  state = {
    likeStyle: {
      color: '#E8E8E8',
    },
    likes: 0,
    loggedIn: true,
  };

  componentDidMount() {
    const userData = authUser();
    const { commentID } = this.props;
    this.getCommentRating(commentID);
    this.checkIfLiked(userData.username, commentID);
  }


  checkIfLiked=(username, id) => {
    axios.get(`https://ah-the-answer-backend-staging.herokuapp.com/api/articles/comments/check/${username}/${id}/`)
      .then((response) => {
        const likeCheck = response.data.hasRated;
        if (likeCheck) {
          this.setState({ likeStyle: { color: 'green' } });
        } else {
          this.setState({ likeStyle: { color: '#E8E8E8' } });
        }
      });
  }

  getCommentRating = (id) => {
    axios.get(`https://ah-the-answer-backend-staging.herokuapp.com/api/articles/comments/${id}/rating/`)
      .then(
        (res) => {
          this.setState({ likes: res.data.likes });
        },
      );
  };

  likeComment= (vote) => {
    const { commentID } = this.props;
    const { likes } = this.state;
    let url;
    if (vote === -1) {
      url = `https://ah-the-answer-backend-staging.herokuapp.com/api/articles/comments/${commentID}/dislike/`;
    } else {
      url = `https://ah-the-answer-backend-staging.herokuapp.com/api/articles/comments/${commentID}/like/`;
    }
    axios.post(url, {}, config )
      .then(
        (res) => {
          console.log(res.data.message);
          if (res.data.message === `You liked comment: ${commentID}`) {
            this.setState({ likeStyle: { color: 'green' } });
            this.setState({ likes: likes + 1 });
          } else if (res.data.message === `Your like has been reverted for comment: ${commentID}`) {
            this.setState({ likeStyle: { color: '#E8E8E8' } });
            this.setState({ likes: likes - 1 });
          }
        },
      )
      .catch((error) => {
        console.log(error.data);
      });
  };

  render() {
    const { likeStyle, loggedIn, likes } = this.state;
    return (
      <div className="mt-4">
        <div className="d-inline-block">
          <FontAwesomeIcon className="article-like-icons" id="like" style={likeStyle} icon="thumbs-up" onClick={() => this.likeComment(1)} />
          <p>{likes}</p>
        </div>
        { loggedIn === false ? <div className="text-danger">Only logged in users can like/dislike</div> : '' }
      </div>
    );
  }
}

export default (CommentLikes);
