import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import authHeader from '../../helpers/authHeader';
import { getArticle } from '../../store/actions/articleActions';

const likeUrl = process.env.REACT_APP_API;

const initialState = {
  dislikeStyle: {
    color: '#E8E8E8',
  },
  likeStyle: {
    color: '#E8E8E8',
  },
  loggedIn: true,
};
export class LikingArticle extends Component {
  state = initialState;

  componentDidMount() {
    this.getLiked();
  }

  getLiked = () => {
    this.setState(initialState);
    axios.get(`${likeUrl}/api/articles/${this.props.slug}/liked/`, { headers: authHeader() })
      .then(
        (res) => {
          if (res.data.message === 'You have reacted to this article before') {
            if (res.data.liked[0].likes === 1) {
              this.setState({ likeStyle: { color: 'green' } });
            } else if (res.data.liked[0].likes === 0) {
              this.setState({ dislikeStyle: { color: 'red' } });
            }
          }
        },
      );
  };

  likeArticle= (vote) => {
    const { slug } = this.props;
    let url;
    if (vote === -1) {
      url = `${likeUrl}/api/articles/${this.props.slug}/dislike/`;
    } else {
      url = `${likeUrl}/api/articles/${this.props.slug}/like/`;
    }
    axios.post(url, {}, { headers: authHeader() })
      .then(
        (res) => {
          if (res.status === 200 || res.status === 202 || res.status === 201 ) {
            this.props.getArticle(slug);
            this.getLiked();
          } else {
            this.setState({ loggedIn: false });
          }
        },
      );
  };
  render() {
    const { dislikeStyle, likeStyle, loggedIn } = this.state;
    return (
      <div className="mt-4">
        <div className="d-inline-block mr-5">
          <FontAwesomeIcon className="article-like-icons" id="dislike" style={dislikeStyle} icon="thumbs-down" onClick={() => this.likeArticle(-1)} />
          <p>{this.props.dislike}</p>
        </div>
        <div className="d-inline-block">
          <FontAwesomeIcon className="article-like-icons" id="like" style={likeStyle} icon="thumbs-up" onClick={() => this.likeArticle(1)} />
          <p>{this.props.like}</p>
        </div>
        { loggedIn === false ? <div className="text-danger">Only logged in users can like/dislike</div> : '' }
      </div>
    );
  }
}

LikingArticle.propTypes = {
  slug: PropTypes.string,
  like: PropTypes.number,
  dislike: PropTypes.number,

};
LikingArticle.defaultProps = {
  slug: '',
  like: 0,
  dislike: 0,
};

const mapDispatchToProps = dispatch => ({
  getArticle: slug => dispatch(getArticle(slug)),
});

export default connect(null, mapDispatchToProps)(LikingArticle);
