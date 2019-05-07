import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getArticle } from '../../store/actions/articleActions';
import Edit from '../../components/Edit';

class ArticleDetails extends Component {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getArticle(slug);
  }

  render() {
    const { article, author } = this.props;
    return (
      <div className="container article-details">
        <div className="row float-right mt-4">
          <Edit slug={article.slug} />
        </div>
        <div className="row">
          <div className="col-lg-4 mt-4">
            <div className="row">
              <div className="col-lg-2">
                <Link to="/profile" className="btn btn-info profile-img">RW</Link>
              </div>
              <div className="col-lg-10">
                <p className="text-muted">By {author.username}</p>
                <p className="text-muted">{moment(article.date_created).calendar()}</p>
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
          <p className="lead">{article.body}</p>
        </div>
      </div>
    );
  }
}

// Prevents Cannot read property “propertyname” of undefined
ArticleDetails.propTypes = {
  article: PropTypes.shape({}),
  author: PropTypes.shape({}),
};
ArticleDetails.defaultProps = {
  article: {},
  author: {},
};

const mapStateToProps = (state) => {
  return {
    article: state.articles.article,
    author: state.articles.author,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticle: slug => dispatch(getArticle(slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);
