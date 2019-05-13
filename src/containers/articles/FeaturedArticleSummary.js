import React from 'react';
import { Link } from 'react-router-dom';
// import { url } from 'inspector';
import Hero from '../../image/hero.jpg';
const smartTruncate = require('smart-truncate');

const divStyle = {
  color: 'white',
  background: `linear-gradient(
    rgba(0,0,0,0.5),
    rgba(0,0,0,0.8)
    ),url(${Hero})`,
  height: '50vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

const FeaturedArticleSummary = ({ article }) => {
  return (
    <div className="jumbotron-fluid main-jumbotron p-3 p-md-5" style={divStyle} data-test="featuredArticle">
      <div className="col-md-12 px-0">
        <h1 className="display-4 text-bold">{article.title}</h1>
        <p className="lead my-3">{smartTruncate(article.description, 100)}</p>
        <p className="lead mb-0">
          <Link to={`/articles/${article.slug}`} className="text-white font-white-bold">Continue reading...</Link>
        </p>
      </div>
    </div>
  );
};

export default FeaturedArticleSummary;
