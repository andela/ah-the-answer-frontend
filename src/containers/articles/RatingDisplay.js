import React, { Component } from 'react';
import { connect } from 'react-redux';

export class RatingDisplay extends Component {
  state ={
    avgRating: 0,
  }

  componentDidMount() {
    this.setState({ avgRating: this.props.rating })
  }

  componentWillReceiveProps(nextProps) {
    this.props.getRating(this.props.slug);
    this.setState({ avgRating: nextProps.rating });
  }

  render() {
    return (
      <div className="container">
        <p className="text-center">Rated: {this.state.avgRating || 0}</p>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    rating: state.articles.rating,
    ratingValue: state.articles.ratingValue,
  }
);

export default connect(mapStateToProps)(RatingDisplay);
