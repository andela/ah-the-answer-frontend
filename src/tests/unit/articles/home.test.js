import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import ConnectedHome, { Home } from '../../../containers/Home';
import { shallow } from '../../enzyme';

describe('Home page', () => {
  it('should render self and child components', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    const div = document.createElement('div');
    const props = {
      getArticles: jest.fn(),
      allArticles: jest.fn(),
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
  it("should call handleOffset and return articles", () => {
    const articles = [
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
    ];
    const allArticlesFunc = jest.fn()
    allArticlesFunc.mockReturnValue(articles)
    const props = {
      allArticles: allArticlesFunc
    }
    const wrapper = shallow(<Home {...props} />)
    const spy = jest.spyOn(wrapper.instance(), 'handleOffset');
    const articlesReturned = wrapper.instance().handleOffset()
    
    expect(spy).toBeCalled();
    expect(articlesReturned).toEqual(articles);
  });
});