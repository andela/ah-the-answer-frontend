import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from './articles/ArticleList';
import { getArticles } from '../store/actions/articleActions';
import FeaturedArticleList from './articles/FeaturedArticleList';
import NewArticleList from './articles/NewArticleList';


class Home extends Component {
  componentDidMount() {
    this.props.getArticles();
  }

  render() {
    const { articles } = this.props;
    return (
      <div className="home container">
        <FeaturedArticleList articles={articles} />
        <div className="row">
          <div className="col s12 m6">
            <p className="text-center">Featured</p>
            <ArticleList articles={articles} />
          </div>
          <div className="s12 m5 offset-m1">
            <p className="text-center">New Articles</p>
            <NewArticleList articles={articles} />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  articles: PropTypes.shape({}),
};
Home.defaultProps = {
  articles: {},
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: () => dispatch(getArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
