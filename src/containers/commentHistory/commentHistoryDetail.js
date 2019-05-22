import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentHistoryDetail = (props) => {
  const { item, user } = props;
  return (
    <div className="pl-3 border-left border-primary ml-5 mt-3 mb-4">
      <div className="d-flex mb-3">
      <FontAwesomeIcon icon="user" color="#20c997" className="comment-icon mt-1" size="3x"/>        
        <div className="d-flex flex-column bd-highlight mt-2 ml-3">
          <small className="bd-highlight">{user.username}</small>
          <small className="bd-highlight text-muted">{user.email}</small>
        </div>
      </div>
      <span className="w-75 pr-2 historyComment mb-2 justify-content-start">{item.body}</span>
      <small className="text-muted">{moment(item.history_date).fromNow()}</small>
    </div>
  );
};
CommentHistoryDetail.propTypes = {
  item: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};
export default CommentHistoryDetail;
