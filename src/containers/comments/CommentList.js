import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComments } from '../../store/actions/commentActions';
import CommentDetail from './CommentDetail';

class CommentList extends Component {
  componentDidMount() {
    this.props.getComments(this.props.slug);
  }

  render() {
    const { comments } = this.props.comments;
    return comments ? (
      comments.map(item => (
        <div>
          <CommentDetail slug={this.props.slug} item={item} key={item.id} />
        </div>
      ))
    ) : (
      <div />
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.shape([]),
};
CommentList.defaultProps = {
  comments: [],
};
export const mapStateToProps = state => ({
  comments: state.comments,
});
export const mapDispatchToProps = dispatch => ({
  getComments: slug => dispatch(getComments(slug)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentList);
