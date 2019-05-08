import React from 'react';
import moment from 'moment';

const smartTruncate = require('smart-truncate');

const NewArticleSummary = ({ article }) => {
  return (
    <div className="card flex-md-row mb-1 box-shadow h-md-250 article-summary">
      <div className="card-body d-flex flex-column align-items-start">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">{smartTruncate(article.description, 50)}</p>
        <small className="text-muted">By {article.author.username}</small>
        <small className="text-muted">{moment(article.date_created).fromNow()} - {article.read_time} read</small>
      </div>
    </div>
  );
};

export default NewArticleSummary;
