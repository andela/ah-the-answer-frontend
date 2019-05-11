import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { CreateArticle } from '../../../containers/articles/CreateArticle';

describe('components', () => {
  it('should render self and child components', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    const div = document.createElement('div');
    const props = {
      history: {
        push: jest.fn(),
      },
    };
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <CreateArticle {...props}/>
        </Router>
      </Provider>, div );
    ReactDOM.unmountComponentAtNode(div);
  });
});