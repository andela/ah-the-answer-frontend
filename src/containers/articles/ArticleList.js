import React from 'react';
import { Link } from 'react-router-dom';
import ArticleSummary from './ArticleSummary';

const ArticleList = ({ articles }) => {
  if (articles && articles.length < 6) {
    return (
      <div className="container" data-test="articleListNone">
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-muted mt-1 ml-1">No featured articles yet</p>
        </div>
      </div>
    );
  }
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
