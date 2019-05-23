import React from 'react';
import Bookmarks from './Bookmarks';

const BookmarkList = () => {
  return (
    <div className="bookmark-list section" data-test="bookmarkList">
      <h3 className="text-center"> Bookmarks </h3>
      <Bookmarks />
    </div>
  );
};

export default BookmarkList;
