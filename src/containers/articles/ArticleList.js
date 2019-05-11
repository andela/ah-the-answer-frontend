import React from 'react';
import { Link } from 'react-router-dom';
import ArticleSummary from './ArticleSummary';

const ArticleList = ({ articles }) => {
  return (
    <div className="article-list section" data-test="articleList">
      { articles && articles.slice(5).map((article) => {
        return (
          <Link to={`/articles/${article.slug}`} key={article.id}>
            <ArticleSummary article={article} />
          </Link>
        );
      }) }
    </div>
  );
};

export default ArticleList;
