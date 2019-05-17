import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';

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
      <ReactStars
        size={15}
        color1="#f1f1f1"
        color2="#20c997"
        half={false}
        edit={false}
        value={this.state.avgRating || 0}
      />
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
