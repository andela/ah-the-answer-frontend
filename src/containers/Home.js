import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleList from './articles/ArticleList';
import { getArticles } from '../store/actions/articleActions';
import FeaturedArticleList from './articles/FeaturedArticleList';
import NewArticleList from './articles/NewArticleList';
import Pages from './articles/Pages';

export class Home extends Component {
  componentDidMount() {
    const { allArticles } = this.props;
    return allArticles(0);
  }

  handleOffset = (pageNumber) => {
    const { allArticles } = this.props;
    const offSet = (pageNumber * 10) - 10;
    return allArticles(offSet);
  }

  render() {
    const { articles, count } = this.props;
    return (
      <div className="home container-fluid p-0">
        <div className="container-fluid d-flex px-5 py-3">
          <div className="col-lg-9 col-md-8 col-sm-12 p-0">
            <h2 className="text-center mb-4 sticky-top bg-white p-2">Featured</h2>
            <ArticleList articles={articles} />
            <Pages changeOffset={this.handleOffset} articleCount={count} />
          </div>
          <div className="col-lg-3 col-md-4 d-none d-md-block">
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

const mapStateToProps = state => ({
  articles: state.articles.articles,
  count: state.articles.count,
});

const mapDispatchToProps = dispatch => ({
  allArticles: articleLimit => dispatch(getArticles(articleLimit)),
});

Home.defaultProps = {
  articles: [],
  count: 0,
};

Home.propTypes = {
  allArticles: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
