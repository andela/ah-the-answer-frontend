import React from 'react';
import { Link } from 'react-router-dom';
import NewArticleSummary from './NewArticleSummary';

const NewArticleList = ({ articles }) => {
  if (articles.length < 2) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-muted mt-1 ml-1">No articles yet</p>
        </div>
      </div>
    );
  }
  return (
    <div className="article-list section">
      { articles && articles.slice(1, 5).map((article) => {
        return (
          <li className="list-group-item" key={article.id}>
            <Link to={`/articles/${article.slug}`}>
              <NewArticleSummary article={article} />
            </Link>
          </li>
        );
      }) }
    </div>
  );
};

export default NewArticleList;
