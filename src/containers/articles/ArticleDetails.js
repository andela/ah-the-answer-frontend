import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { getArticle } from '../../store/actions/articleActions';
import Edit from '../../components/Edit';

class ArticleDetails extends Component {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getArticle(slug);
  }

  render() {
    const { article, author, message } = this.props;
    if (message && message === 'The article requested does not exist') {
      this.props.history.push('/');
    }
    if (article && article.body) {
      return (
        <div className="container article-details">
          <div className="row float-right mt-4">
            <Edit slug={article.slug} />
          </div>
          <div className="row">
            <div className="col-lg-4 mt-4">
              <div className="row">
                <div className="col-lg-3">
                  <Link to="/profile" className="btn btn-info profile-img">RW</Link>
                </div>
                <div className="col-lg-9">
                  <div className="text-muted">By {author.username}</div>
                  <div className="text-muted">{moment(article.date_created).calendar()}</div>
                  <div className="text-info mb-0">{article.read_time} read</div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <h1 className="mt-4">{article.title}</h1>
            </div>
          </div>
          <div className="container-fluid text-center">
            <hr />
            <img src="https://res.cloudinary.com/dv85uhrw5/image/upload/v1556052045/pocvovruu6lhhic2fhq1.jpg" alt="" className="img-fluid rounded" />
            <hr />
          </div>
          <div className="container-fluid container-width">
            <div className="lead">{parse(article.body)}</div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

// Prevents Cannot read property “propertyname” of undefined
ArticleDetails.propTypes = {
  article: PropTypes.shape({}),
  author: PropTypes.shape({}),
  message: PropTypes.shape({}),
};
ArticleDetails.defaultProps = {
  article: {},
  author: {},
  message: {},
};

const mapStateToProps = (state) => {
  return {
    article: state.articles.article,
    author: state.articles.author,
    message: state.articles.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticle: slug => dispatch(getArticle(slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);
