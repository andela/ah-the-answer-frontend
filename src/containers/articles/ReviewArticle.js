import React, { Component } from 'react';
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const config = {
  headers: authHeader(),
};

class ReviewArticle extends Component {
  state = {
    review: 'Default',
    rating: 0,
  };

  componentDidMount() {
    this.setState({ review: this.props.review });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ review: nextProps.review });
  }

  handleRatingChange = (e) => {
    this.setState({
      rating: e.target.value,
    });
  }

  handleReviewChange = (e) => {
    this.setState({
      review: e.target.value,
    });
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const { review, rating } = this.state;
    const { userName } = this.props;
    const { slug } = this.props;
    if (this.props.isReviewed) {
      axios.put(`http://127.0.0.1:8000/api/articles/${slug}/reviews/${userName}`, { review: { review_body: review, rating_value: rating } }, config);
    } else {
      axios.post(`http://127.0.0.1:8000/api/articles/${slug}/reviews/`, { review: { review_body: review, rating_value: rating } }, config);
    }
  }

  render() {
    console.log(this.props.isReviewed)
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Review Article
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu">
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <textarea className="form-control" id="articleReview" rows="3" value={this.state.review} onChange={this.handleReviewChange} />
              <small id="userNameHelp" className="form-text text-muted">Leave A Thoughtful Review (optional)</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Rate The Article</label>
              <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleRatingChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Save Your Review</button>
          </form>
        </div>
      </div>
    );
  }
}
export default (ReviewArticle);
