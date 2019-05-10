import React from 'react';
import moment from 'moment';

const smartTruncate = require('smart-truncate');

const ArticleSummary = ({ article }) => (
  <div className="card shadow flex-md-row mb-4 box-shadow article-summary">
    <img className="card-img-left flex-auto d-none d-md-block" src="https://res.cloudinary.com/dv85uhrw5/image/upload/v1556052045/pocvovruu6lhhic2fhq1.jpg" alt={article.description} />
    <div className="card-body d-flex flex-column align-items-start">
      <h5 className="card-title text-primary text-bold">{article.title}</h5>
      <p className="card-text text-muted">{smartTruncate(article.description, 100)}</p>
      <small className="text-muted">By {article.author.username}</small>
      <small className="text-muted">
        {moment(article.date_created).fromNow()} - {article.read_time} read
      </small>
    </div>
  </div>
);

export default ArticleSummary;
