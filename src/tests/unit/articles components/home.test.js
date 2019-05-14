import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Home } from '../../../containers/Home';

describe('Home page', () => {
  it('should render self and child components', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    const div = document.createElement('div');
    const props = {
      getArticles: jest.fn(),
      articles: [
        {
          title: 'test',
          description: 'description',
          body: 'content',
          author: {
            username: 'alehandro',
          },
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          author: {
            username: 'alehandro',
          },
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          author: {
            username: 'alehandro',
          },
        },
      ],
    };
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Home {...props}/>
        </Router>
      </Provider>, div );
    ReactDOM.unmountComponentAtNode(div);
  });
});