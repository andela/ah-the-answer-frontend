import React, { Component } from 'react';
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

  handleOnClick = (e) => {
    this.setState({
      userRating: e.target.value,
    });
    const userRating = e.target.value;
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
    const { userRating } = this.state;
    console.log(userRating);
    const fill = "btn btn-secondary"
    const unfill = "btn btn-warning-secondary"
    return (
      <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" className={(userRating >= 1) ? (fill) : (unfill)} onClick={this.handleOnClick} value={1}>1</button>
          <button type="button" className={(userRating >= 2) ? (fill) : (unfill)} onClick={this.handleOnClick} value={2}>2</button>
          <button type="button" className={(userRating >= 3) ? (fill) : (unfill)} onClick={this.handleOnClick} value={3}>3</button>
          <button type="button" className={(userRating >= 4) ? (fill) : (unfill)} onClick={this.handleOnClick} value={4}>4</button>
          <button type="button" className={(userRating >= 5) ? (fill) : (unfill)} onClick={this.handleOnClick} value={5}>5</button>
        </div>
      </div>
    );
  }
}

export default RatingBar;
