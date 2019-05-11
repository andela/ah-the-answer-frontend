import React from 'react';
import { Link } from 'react-router-dom';
import NewArticleSummary from './NewArticleSummary';

const NewArticleList = ({ articles }) => {
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
