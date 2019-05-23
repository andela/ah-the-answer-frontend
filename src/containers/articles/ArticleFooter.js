import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  EmailShareButton, EmailIcon,
  WhatsappShareButton, WhatsappIcon,
} from 'react-share';
import authStatus from '../../helpers/authStatus';
import { bookmarkArticle, getBookmarks } from '../../store/actions/articleActions';

export class ArticleFooter extends Component {

  state = {
    isBookmarked: false,
  }

  componentDidMount() {
    this.props.getBookmarks();
  }

  componentWillReceiveProps(nextProps) {
    const { bookmarks } = nextProps;
    const { article } = nextProps;
    if (this.props.bookmarks !== nextProps.bookmarks) {
      const obj = bookmarks.find(o => o.article_id === article.id);
      if (obj && obj.article_id === article.id) {
        this.setState({
          isBookmarked: true,
        });
      }
    }
  }

  handleClick = () => {
    this.props.bookmarkArticle(this.props.id);
    this.setState(
      prevState => (
        { ...prevState, isBookmarked: !prevState.isBookmarked }
      ),
    );
  }

  render() {
    const { isBookmarked } = this.state;
    const { article } = this.props;
    const url = 'https://ah-the-answer-frontend-staging.herokuapp.com/articles/';
    return (
      <div className="container-fluid container-width" data-test="articleFooter">
        <hr />
        <div className="">
          {
            authStatus() ? (
              <button type="button" title="Bookmark this article to read later" id="bookmarkButton" className="btn btn-outline-primary ml-2 no-outline" autoComplete="off" onClick={this.handleClick}>
                { isBookmarked ? <i className="fas fa-bookmark fa-lg" /> : <i className="far fa-bookmark fa-lg" /> }
              </button>
            ) : (
              <button type="button" title="Log in to bookmark this article" id="bookmarkButton" className="btn btn-outline-secondary ml-2 no-outline button-disabled" autoComplete="off" disabled>
                <i className="far fa-bookmark fa-lg" />
              </button>
            )
          }

          <div className="float-right social-buttons">
            <FacebookShareButton
              url={`${url}${article.slug}`}
              quote={article.title}
              windowWidth={750}
              windowHeight={600}
              className="social-share"
            >
              <FacebookIcon size={42} borderRadius={5} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`${url}${article.slug}`}
              title={article.title}
              windowWidth={750}
              windowHeight={600}
              className="social-share"
            >
              <TwitterIcon size={42} borderRadius={5} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={`${url}${article.slug}`}
              title={article.title}
              separator=" "
              windowWidth={750}
              windowHeight={600}
              className="social-share"
            >
              <WhatsappIcon size={42} borderRadius={5} />
            </WhatsappShareButton>
            <EmailShareButton
              url={`${url}${article.slug}`}
              subject={article.title}
              body={article.description}
              separator="Follow this link to read the article "
              windowWidth={750}
              windowHeight={600}
              openWindow
              className="social-share"
            >
              <EmailIcon size={42} borderRadius={5} />
            </EmailShareButton>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

ArticleFooter.propTypes = {
  article: PropTypes.shape({}),
};
ArticleFooter.defaultProps = {
  article: {},
};

const mapStateToProps = state => ({
  error: state.articles.error,
  bookmarks: state.articles.bookmarks,
  bookmarkMessage: state.articles.bookmarkMessage,
  article: state.articles.article,
});

const mapDispatchToProps = (dispatch) => {
  return {
    bookmarkArticle: id => dispatch(bookmarkArticle(id)),
    getBookmarks: () => dispatch(getBookmarks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFooter);
