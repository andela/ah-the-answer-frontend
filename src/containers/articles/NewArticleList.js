import React from 'react';
import { Link } from 'react-router-dom';
import NewArticleSummary from './NewArticleSummary';

const NewArticleList = ({ articles }) => {
  return (
    <div className="article-list section">
      { articles && articles.slice(1, 5).map((article) => {
        return (
          <Link to={`/articles/${article.slug}`} key={article.id}>
            <NewArticleSummary article={article} />
          </Link>
        );
      }) }
    </div>
  );
};

export default NewArticleList;