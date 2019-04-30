import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleList from '../articles/ArticleList';


function Home(props) {
  const { articles } = props;

  return (
    <div>
      <h4 className="center">Home</h4>
      <ArticleList articles={articles} />
    </div>
  );
}

Home.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    body: PropTypes.string.isRequired,
  })),
};
Home.defaultProps = {
  articles: {
    description: '',
  },
};

const mapStateToProps = state => ({ articles: state.articles.articles });

export default connect(mapStateToProps)(Home);
