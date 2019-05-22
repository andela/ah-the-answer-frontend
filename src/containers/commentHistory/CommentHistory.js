import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCommentHistory } from '../../store/actions/commentHistoryAction';
import CommentHistoryDetail from './commentHistoryDetail';
export class CommentHistoryList extends Component {
  componentDidMount() {
    const { slug, id, getCommentHistory } = this.props;
    getCommentHistory(slug, id);
  }

  render() {
    const { commentHistory, user } = this.props;
    const commentHistoryList = commentHistory.commentHistory;
    return commentHistoryList
      ? commentHistoryList.map(item => (
        <CommentHistoryDetail item={item} key={item.history_id} user={user} />
      ))
      : null;
  }
}

CommentHistoryList.propTypes = {
  commentHistory: PropTypes.shape([]),
  user: PropTypes.shape({}).isRequired,
  getCommentHistory: PropTypes.func.isRequired,
};
CommentHistoryList.defaultProps = {
  commentHistory: [],
};
export const mapStateToProps = state => ({
  commentHistory: state.commentHistory,
});
export const mapDispatchToProps = dispatch => ({
  getCommentHistory: (slug, id) => dispatch(getCommentHistory(slug, id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentHistoryList);
