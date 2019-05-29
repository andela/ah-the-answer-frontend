import React from 'react';
import ArticleSummary from './ArticleSummary';

const ArticleList = ({ articles }) => {
  if (articles && articles.length < 1) {
    return (
      <div className="container" data-test="articleListNone">
        <div className="d-flex justify-content-center">
          <p className="text-muted mt-1 ml-1">No featured articles yet</p>
        </div>
      </div>
    );
  }
  return (
    <div className="article-list section card-columns" data-test="articleList">
      { articles && articles.slice(0,10).map((article) => {
        const imgRegex = /<img[^>]+src="(http:\/\/[^">]+)"/g;
        const src = imgRegex.exec(article.body);
        let imgSrc = 'https://res.cloudinary.com/dv85uhrw5/image/upload/v1556052045/pocvovruu6lhhic2fhq1.jpg';
        if (src) {
          imgSrc = src[1];
        }
        return (
          <ArticleSummary article={article} image={imgSrc} />
        );
      }) }
    </div>
  );
};

export default ArticleList;
