import React from 'react';
import moment from 'moment';


const NotificationSummary = ({ notification }) => (
  <div className="card shadow flex-md-row mb-4 box-shadow article-summary">
    <div className="card-body d-flex flex-column align-items-start">
      <p className="card-text text-muted">{notification.body}</p>
      <small className="text-muted">
        {moment(notification.CreatedAt).fromNow()}
      </small>
    </div>
  </div>
);

export default NotificationSummary;
