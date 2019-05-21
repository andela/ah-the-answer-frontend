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
        let imgRegex = /<img[^>]+src="(http:\/\/[^">]+)"/g;
        let src = imgRegex.exec(article.body);
        let imgSrc = 'https://res.cloudinary.com/dv85uhrw5/image/upload/v1556052045/pocvovruu6lhhic2fhq1.jpg';
        if (src) {
          imgSrc = src[1];
        }
        return (
          <Link to={`/articles/${article.slug}`} key={article.id}>
            <ArticleSummary article={article} image={imgSrc} />
          </Link>
        );
      }) }
    </div>
  );
};

export default ArticleList;
