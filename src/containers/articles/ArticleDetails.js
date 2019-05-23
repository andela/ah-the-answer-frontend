import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import isOwner from '../../helpers/isOwner';
import { getArticle, checkReviewed, getRating, putRating, postRating } from '../../store/actions/articleActions';
import authUser from '../../helpers/authUser';
import Edit from '../../components/Edit';
import RatingDisplay from './RatingDisplay';
import RatingBar from './RatingBar';
import CreateComment from '../comments/CreateComments';
import CommentList from '../comments/CommentList';
import ArticleFooter from './ArticleFooter';
import authStatus from '../../helpers/authStatus';
import LikingArticle from './LikingArticle';

class ArticleDetails extends Component {
  componentDidMount() {
    const userData = authUser();
    const { slug } = this.props.match.params;
    this.props.getArticle(slug);
    this.props.getRating(slug);
    this.props.checkReviewed(userData.username, slug);
  }

  updateState= () => {
    this.componentDidMount();
  };

  render() {
    const userData = authUser();
    const { article, author, message, rating, userReview, isReviewed, ratingValue } = this.props;
    if (message && message === 'The article requested does not exist') {
      this.props.history.push('/');
    }
    if (article && article.body) {
      return (
        <div className="container article-details">
          <div className="row float-right mt-4">
            {isOwner(author.username) ? <Edit slug={article.slug} /> : null}
          </div>
          <div className="row d-flex align-items-center pt-4">
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-3">
                  <Link
                    to={`/profile/${article.author.username}`}
                    className="btn btn-info profile-img d-flex align-items-center justify-content-center"
                  >
                    {article.author.username.slice(0, 2)}
                  </Link>
                </div>
                <div className="col-lg-9">
                  <div className="text-muted">
                    <span className="mr-1">By</span>
                    {author.username}
                  </div>
                  <div className="text-muted">{moment(article.date_created).calendar()}</div>
                  <div className="text-primary mb-0">
                    {article.read_time}
                    <span className="ml-1">read</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h1 className="m-0">{article.title}</h1>
            </div>
            <div className="col-lg-2 d-flex align-items-center">
              <div>
                <div className="text-muted mb-0">Rating</div>
                <RatingDisplay
                  number={rating}
                  getRating={this.props.getRating}
                  slug={article.slug}
                />
              </div>
            </div>
          </div>
          <div className="container-fluid text-center">
            <hr />
            <img
              src="https://res.cloudinary.com/dv85uhrw5/image/upload/v1556052045/pocvovruu6lhhic2fhq1.jpg"
              alt=""
              className="img-fluid rounded"
            />
            <hr />
          </div>
          <div className="container-fluid container-width">
            <div className="lead">{parse(article.body)}</div>
          </div>
          <div className="container-fluid container-width article-footer text-center">
            <LikingArticle
              like={article.like_count}
              dislike={article.dislike_count}
              slug={article.slug}
            />
          </div>
          <div className="container container-width d-flex align-items-center">
            {(author.username === userData.username || userData === false) ? (null) : (
              <div className="ml-auto">
                <div className="text-primary mb-0">Rate The Article?</div>
                <RatingBar
                  review={userReview}
                  slug={article.slug}
                  userName={userData.username}
                  isReviewed={isReviewed}
                  ratingValue={ratingValue}
                  putRating={this.props.putRating}
                  postRating={this.props.postRating}
                />
              </div>
            )}
          </div>
          <ArticleFooter id={article.id} />
          <div className="container">
            <CreateComment slug={this.props.match.params.slug} />
            <div className="col-lg-8 col-sm-12 mx-auto">
              <CommentList slug={this.props.match.params.slug} />
            </div>
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
  slug: PropTypes.shape({}),
};
ArticleDetails.defaultProps = {
  article: {},
  author: {},
  slug: {},
};

const mapStateToProps = state => ({
  article: state.articles.article,
  author: state.articles.author,
  message: state.articles.message,
  rating: state.articles.rating,
  userReview: state.articles.userReview,
  isReviewed: state.articles.isReviewed,
  ratingValue: state.articles.ratingValue,

});

const mapDispatchToProps = dispatch => ({
  getArticle: slug => dispatch(getArticle(slug)),
  getRating: slug => dispatch(getRating(slug)),
  checkReviewed: (username, slug) => dispatch(checkReviewed(username, slug)),
  putRating: (slug, userName, review, userRating) => dispatch(putRating(slug, userName, review, userRating)),
  postRating: (slug, review, userRating) => dispatch(postRating(slug, review, userRating)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetails);
