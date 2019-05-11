import React from 'react';
import moment from 'moment';

const NewArticleSummary = ({ article }) => {
  return (
    <div className="flex-md-row mb-1 box-shadow article-summary">
      <div className="d-flex flex-column align-items-left">
        <h5 className="card-title text-primary">{article.title}</h5>
        <small className="text-muted">
          <span className="mr-1">By</span>
          {article.author.username}
        </small>
        <small className="text-muted">
          {moment(article.date_created).fromNow()}
          <span>{` - ${article.read_time} read`}</span>
        </small>
      </div>
    </div>
  );
};

export default NewArticleSummary;
