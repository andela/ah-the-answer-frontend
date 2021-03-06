import React from 'react';
import moment from 'moment';

const smartTruncate = require('smart-truncate');

const ArticleSummary = ({ article, image }) => (
  <div className="card shadow flex-md-row mb-4 box-shadow article-summary" data-test="articleSummary">
    <img className="card-img-left flex-auto d-none d-md-block" src={image} alt={article.description} />
    <div className="card-body d-flex flex-column align-items-start">
      <a href={`/articles/${article.slug}`}>
        <h5 className="card-title text-primary text-bold">{article.title}</h5>
      </a>
      <p className="card-text text-muted">{smartTruncate(article.description, 100)}</p>
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

export default ArticleSummary;
