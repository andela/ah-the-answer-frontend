import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBookmarks } from '../../store/actions/articleActions';
import authStatus from '../../helpers/authStatus';

export class BookmarkList extends Component {
  componentDidMount() {
    this.props.getBookmarks();
  }

  render() {
    if (authStatus() === false) {
      this.props.history.push('/');
    }
    const { bookmarks, bookmarknumber } = this.props;
    if (bookmarks && bookmarks.length === 0) {
      return (
        <div className="container" data-test="articleListNone">
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-muted mt-1 ml-1">No bookmarks yet</p>
          </div>
        </div>
      );
    }
    return (
      <div className="article-list section" data-test="bookmarkList">
        { bookmarks && bookmarks.slice(0, bookmarknumber).map((bookmark) => {
          return (
            <Link to={`/articles/${bookmark.article_slug}`} className="list-group-item text-center" key={bookmark.id}>
              {bookmark.title}
            </Link>
          );
        })}
        { bookmarknumber === 5 ? <li className="list-group-item text-center"><Link to="/bookmarks">View More</Link></li> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookmarks: state.articles.bookmarks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookmarks: () => dispatch(getBookmarks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);
