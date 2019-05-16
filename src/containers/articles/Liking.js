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
};
class Liking extends Component {
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
  }

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
          this.props.getArticle(slug);
          this.getLiked();
        },
      );
  };

  render() {
    const { dislikeStyle, likeStyle } = this.state;
    return (
      <div className="mt-4">
        <div className="d-inline-block mr-5">
          <FontAwesomeIcon className="article-like-icons" style={dislikeStyle} icon="thumbs-down" onClick={() => this.likeArticle(-1)} />
          <p>{this.props.dislike}</p>
        </div>
        <div className="d-inline-block">
          <FontAwesomeIcon className="article-like-icons" style={likeStyle} icon="thumbs-up" onClick={() => this.likeArticle(1)} />
          <p>{this.props.like}</p>
        </div>
      </div>
    );
  }
}

Liking.propTypes = {
  slug: PropTypes.string,
  like: PropTypes.number,
  dislike: PropTypes.number,
};
Liking.defaultProps = {
  slug: '',
  like: 0,
  dislike: 0,
};

const mapDispatchToProps = dispatch => ({
  getArticle: slug => dispatch(getArticle(slug)),
});

export default connect(null, mapDispatchToProps)(Liking);
