import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import ArticleDetails from '../../../containers/articles/ArticleDetails';

const user = {
  username: 'testuser',
  token: 'testtoken',
};

localStorage.setItem('user', JSON.stringify(user));

describe('components', () => {
  it('should render self and child components', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({
      bookmarks: [],
      articles: {
        bookmarks: [
          {title: 'hello',}
        ]
      },
      article:         {
        id: 69,
        title: "Peoples Power",
        body: "People need to know",
        description: "Power",
        is_published: true,
        date_created: "2019-05-21T13:52:41.388893Z",
        date_modified: "2019-05-21T13:53:28.249640Z",
        slug: "peoples-power-a777c5f14f66",
        read_time: "2 min",
        author: {
            "email": "ryanwire@outlook.com",
            "username": "ryanwire"
        },
        like_count: 0,
        dislike_count: 0,
        tags: []
    },
    author: {
        email: "ryanwire@outlook.com",
        username: "ryanwire"
    },
    });
    const div = document.createElement('div');
    const props = {
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
          <ArticleDetails {...props} />
        </Router>
      </Provider>, div );
    ReactDOM.unmountComponentAtNode(div);
  }); 
});