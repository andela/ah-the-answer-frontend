import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import authHeader from '../../helpers/authHeader';
import authUser from '../../helpers/authUser';

const config = {
  headers: authHeader(),
};

const configUrls = {
  root: 'https://ah-the-answer-backend-staging.herokuapp.com/api/articles/',
};

// const configUrls = {
//   root: 'http://127.0.0.1:8000/api/articles/',
// };

class CommentLikes extends Component {
  state = {
    likeStyle: {
      color: '#E8E8E8',
    },
    likes: 0,
    loggedIn: true,
    clickReady: true,
  };

  componentDidMount() {
    const userData = authUser();
    const { commentID } = this.props;
    this.getCommentRating(commentID);
    this.checkIfLiked(userData.username, commentID);
  }


  checkIfLiked=(username, id) => {
    axios.get(`${configUrls.root}comments/check/${username}/${id}/`)
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
    axios.get(`${configUrls.root}comments/${id}/rating/`)
      .then(
        (res) => {
          this.setState({ likes: res.data.likes });
        },
      );
  };

  likeComment= () => {
    const { clickReady } = this.state;
    if (clickReady === true) {
      this.setState({ clickReady: false });
      const { commentID } = this.props;
      const { likes } = this.state;
      const url = `${configUrls.root}comments/${commentID}/like/`;
      axios.post(url, {}, config)
        .then(
          (res) => {
            if (res.data.message === `You liked comment: ${commentID}`) {
              this.setState({ likeStyle: { color: 'green' } });
              this.setState({ likes: likes + 1 });
              this.setState({ clickReady: true });
            } else if (res.data.message === `Your like has been reverted for comment: ${commentID}`) {
              this.setState({ likeStyle: { color: '#E8E8E8' } });
              this.setState({ likes: likes - 1 });
              this.setState({ clickReady: true });
            }
          },
        )
        .catch((error) => {
          console.log(error.data);
        });
    }
  };

  render() {
    const { likeStyle, loggedIn, likes } = this.state;
    return (
      <div className="mt-4">
        <div className="d-inline-block">
          <FontAwesomeIcon className="comment-like-icons" id="like" style={likeStyle} icon="thumbs-up" onClick={() => this.likeComment()} />
          <p>{likes}</p>
        </div>
        { loggedIn === false ? <div className="text-danger">Only logged in users can like/dislike</div> : '' }
      </div>
    );
  }
}

export default (CommentLikes);
