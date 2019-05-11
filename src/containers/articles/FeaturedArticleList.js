import React from 'react';
import FeaturedArticleSummary from './FeaturedArticleSummary';

const FeaturedArticleList = ({ articles }) => {
  return (
    <div className="article-list section" data-test="featuredList">
      { articles && articles.slice(0, 1).map((article) => {
        return (
          <FeaturedArticleSummary article={article} key={article.id} />
        );
      }) }
    </div>
  );
};

export default FeaturedArticleList;
