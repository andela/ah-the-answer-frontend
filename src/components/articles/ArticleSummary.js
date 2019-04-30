import React from 'react';
import { Link } from 'react-router-dom';

const ArticleSummary = ({ article }) => {
  return (
    <div className="article card" key={article.id}>
      <div className="card-content">
        <Link to={`/${article.id}`}>
          <span className="card-title red-text">{ article.title }</span>
          {article.description}
        </Link>
        <p>{article.body}</p>
      </div>
    </div>
  );
}

export default ArticleSummary;
