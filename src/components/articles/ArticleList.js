import React from 'react';
import ArticleSummary from './ArticleSummary';

const ProjectList = ({ articles }) => {
  return (
    <div className="articles-list section">
      { articles && articles.map((article) => {
        return (
          <ArticleSummary article={article} key={article.id} />
        );
      })
      }
    </div>
  );
};

export default ProjectList;
