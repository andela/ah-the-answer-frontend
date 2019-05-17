import React from 'react';
import moment from 'moment';
import getUrls from 'get-urls';

const makeUrl = (body) => {
  const url = getUrls(body).values().next().value;
  const slug = url.split('/')[5];
  return slug;
};

const NotificationSummary = ({ notification }) => (

  <div className="container row" data-test="notificationSummary">
    <div className="list-group-item list-group-item-action flex-column align-items-start mb-4 col-lg-8 col-md-10 col-sm-12 mx-auto">
      <div className="d-flex w-100 justify-content-between">
        <small className="text-muted">
          {moment(notification.createdAt).fromNow()}
        </small>
      </div>
      <p className="card-text text-muted">{notification.body}</p>
      <div>
        <a href={`/articles/${makeUrl(notification.body)}`} className="btn btn-primary btn-sm">View Article</a>
      </div>
    </div>
  </div>

);

export default NotificationSummary;
