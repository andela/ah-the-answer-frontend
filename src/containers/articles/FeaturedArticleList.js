import React from 'react';
import PropTypes from 'prop-types';
import FeaturedArticleSummary from './FeaturedArticleSummary';

const NewArticleList = ({ articles }) => {
  return (
    <div className="article-list section">
      { articles && articles.slice(0, 1).map((article) => {
        return (
          <FeaturedArticleSummary article={article} key={article.id} />
        );
      }) }
    </div>
  );
};

NewArticleList.propTypes = {
  articles: PropTypes.shape({}),
};
NewArticleList.defaultProps = {
  articles: {},
};

export default NewArticleList;
