import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      <div className="home container-fluid p-0">
        <FeaturedArticleList articles={articles} />
        <div className="container-fluid d-flex px-5 py-3">
          <div className="col-lg-8 col-md-8 col-sm-12 p-0">
            <h2 className="text-center mb-4 sticky-top bg-white p-2">Featured</h2>
            <ArticleList articles={articles} />
          </div>
          <div className="col-lg-3 offset-1 col-md-4 d-none d-md-block">
            <h2 className="text-center mb-4 sticky-top">New Articles</h2>
            <ul className="list-group list-group-flush sticky-top">
              <NewArticleList articles={articles} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

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
