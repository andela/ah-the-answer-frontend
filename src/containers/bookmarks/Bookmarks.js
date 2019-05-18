import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBookmarks } from '../../store/actions/articleActions';

export class BookmarkList extends Component {
  componentDidMount() {
    this.props.getBookmarks();
  }

  render() {
    const { bookmarks } = this.props;
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
        { bookmarks && bookmarks.slice(0, 5).map((bookmark) => {
          return (
            <Link to="/" className="list-group-item text-center" key={bookmark.id}>
              {bookmark.title}
            </Link>
          );
        })}
        <li className="list-group-item text-center"><Link to="/bookmarks">View More</Link></li>
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
