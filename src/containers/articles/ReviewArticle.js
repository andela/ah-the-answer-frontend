import React, { Component } from 'react';
import axios from 'axios';
const setAxios = require('axios');

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.1gC7fqNwCSTYxCQAHvfNmfyb2GhenC6jG0nKLJ-izCM';
setAxios.defaults.headers.common = {'Authorization': `Bearer ${token}`};


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
    console.log(e.target.value);
  }

  handleReviewChange = (e) => {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Review Article
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu">
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <textarea className="form-control" id="articleReview" rows="3" defaultValue={this.state.review} onChange={this.handleReviewChange} key={this.state.review} />
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
