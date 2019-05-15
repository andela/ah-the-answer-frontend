import React, { Component } from 'react';
import ReactStars from 'react-stars';
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const config = {
  headers: authHeader(),
};

class RatingBar extends Component {
  state ={
    review: '',
    userRating: 0,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ userRating: nextProps.ratingValue });
  }

  handleOnChange = (newRating) => {
    this.setState({
      userRating: newRating,
    });
    const userRating = newRating;
    const { review } = this.state;
    const { userName } = this.props;
    const { slug } = this.props;
    if (this.props.isReviewed) {
      axios.put(`http://127.0.0.1:8000/api/articles/${slug}/reviews/${userName}`, { review: { review_body: review, rating_value: userRating } }, config);
    } else {
      axios.post(`http://127.0.0.1:8000/api/articles/${slug}/reviews/`, { review: { review_body: review, rating_value: userRating } }, config);
    }
  }

  render() {
    return (
      <ReactStars
        onChange={this.handleOnChange}
        size={24}
        color1="#f1f1f1"
        color2="#ffd700"
        half={false}
        value={this.state.userRating || 0}
      />
    );
  }
}

export default RatingBar;
