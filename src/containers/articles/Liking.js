import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import authHeader from '../../helpers/authHeader';
import { getArticle } from '../../store/actions/articleActions';


const likeUrl = process.env.REACT_APP_API;

class Liking extends Component {
  state = {
    iconStyle: {
      color: '#',
    },
  };

  likeArticle= (vote) => {
    const { slug } = this.props;
    let url;
    if (vote === -1) {
      console.log(vote);
      url = `${likeUrl}/api/articles/${this.props.slug}/dislike/`;
    } else {
      url = `${likeUrl}/api/articles/${this.props.slug}/like/`;
    }
    axios.post(url, {}, { headers: authHeader() })
      .then(
        (res) => {
          this.props.getArticle(slug);
        },
      );
  };

  render() {
    const { iconStyle } = this.state;
    return (
      <div className="mt-4">
        <div className="d-inline-block mr-5">
          <FontAwesomeIcon className="article-like-icons" style={iconStyle} icon="thumbs-down" onClick={() => this.likeArticle(-1)} />
          <p>{this.props.dislike}</p>
        </div>
        <div className="d-inline-block">
          <FontAwesomeIcon className="article-like-icons" icon="thumbs-up" onClick={() => this.likeArticle(1)} />
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
