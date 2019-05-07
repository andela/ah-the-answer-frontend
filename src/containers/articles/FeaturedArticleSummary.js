import React from 'react';
import { Link } from 'react-router-dom';

const smartTruncate = require('smart-truncate');

const FeaturedArticleSummary = ({ article }) => {
  return (
    <div className="jumbotron p-3 p-md-5 rounded bg-info">
      <div className="col-md-12 px-0">
        <h1 className="display-4 font-italic">{article.title}</h1>
        <p className="lead my-3">{smartTruncate(article.body, 200)}</p>
        <p className="lead mb-0">
          <Link to={`/articles/${article.slug}`} className="text-white font-white-bold">Continue reading...</Link>
        </p>
      </div>
    </div>
  );
};

export default FeaturedArticleSummary;
