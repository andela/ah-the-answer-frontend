import React, { Component } from 'react';
import ReactStars from 'react-stars';


class RatingBar extends Component {
  state ={
    review: '',
    userRating: 0,
  }

  componentDidMount() {
    this.setState({ userRating: this.props.ratingValue });
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
      this.props.putRating(slug, userName, review, userRating);
    } else {
      this.props.postRating(slug, review, userRating);
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
