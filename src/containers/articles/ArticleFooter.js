import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    return (
      <div className="container-fluid container-width" data-test="articleFooter">
        <hr />
        <div className="row">
          <button type="button" title="Bookmark this article to read later" id="bookmarkButton" className="btn btn-outline-primary" autoComplete="off" onClick={this.handleClick}>
            { isBookmarked ? <i className="fas fa-bookmark fa-lg" /> : <i className="far fa-bookmark fa-lg" /> }
          </button>
        </div>
        <hr />
      </div>
    );
  }
}

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
