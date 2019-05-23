import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { shallow } from '../../enzyme';
import { CreateArticle } from '../../../containers/articles/CreateArticle';

const testUser = {
  username: 'testuser',
  token: 'testtoken',
}

localStorage.setItem('user', JSON.stringify(testUser));

describe('Create Article component', () => {
  it('should render self and child components', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({
      articles: [],
      error: {},
      message: {},
      editMessage: {},
      deleteMessage: {},
      rating: 0,
      ratingValue: 0,
      userReview: '',
      isReviewed: false,
      bookmarkMessage: {},
    });
    const wrapper = shallow(<CreateArticle/>)

    wrapper.setProps({
      message: {
        success: "worked",
        article: {
          slug: 'test-slug',
        },
      },
      history: {
        push: jest.fn(),
      },
    })
    wrapper.setState({
      redirect: true,
    })


    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <CreateArticle />
        </Router>
      </Provider>, div );
    ReactDOM.unmountComponentAtNode(div);
  });
});