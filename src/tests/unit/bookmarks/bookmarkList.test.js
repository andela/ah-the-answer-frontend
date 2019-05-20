import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import BookmarkList from '../../../containers/bookmarks/BookmarkList';

describe('components', () => {
  xit('should render self and child components', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({
      bookmarks: [],
    });
    const div = document.createElement('div');
    const props = {
      bookmarks: {},
      getBookmarks: jest.fn(),
      match: {
        params: {
          slug: 'dummy',
        },
      },
      history: {
        push: jest.fn(),
      },
    };
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <BookmarkList />
        </Router>
      </Provider>, div );
    ReactDOM.unmountComponentAtNode(div);
  }); 
});