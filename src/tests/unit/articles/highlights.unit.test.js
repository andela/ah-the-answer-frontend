import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { mount , shallow, render } from '../../enzyme';
import ArticleDetails from '../../../containers/articles/ArticleDetails';
import Highlighting from '../../../containers/articles/Highlighting';
import './document.actions';

const highlightUrl = process.env.REACT_APP_API;
const highlightProp = {
  slug: 'article-1243',
  renderer: jest.fn(),
  highlightedText: '',
  start:'',
  end:'',
  highlightComment:''
};
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
const props = {
  match: {
    params: {
      slug: 'dummy',
    },
  },
  history: {
    push: jest.fn(),
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
    "email": "ryanwire@outlook.com",
    "username": "ryanwire"
  },
};
const user = {
  username: 'testuser',
  token: 'testtoken',
};
localStorage.setItem('user', JSON.stringify(user));

describe('Highlights', () => {

  it('are fetched in component load', () => {
    const mock = new MockAdapter(Axios);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ArticleDetails {...props} />
        </Router>
      </Provider>);
    mock
      .onGet(`${highlightUrl}/api/articles/article-slug-12343/highlight/`)
      .reply(200, {
        start: 1,
        end: 2,
        comment: 'Poetic',
        username: 'joe'
      });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#highlightMessage').length).toEqual(0);
  });
  it('detects on change and sets state', () => {
    const wrapper =  mount(<Highlighting {...highlightProp}/>);
    const change = wrapper.find('#highlightInput');
    change.simulate("change", {target: { value:"foo"}} );
    const state = wrapper.instance().state;
    expect(state.highlightComment).toEqual('foo');
  });
  it('create highlight works', () => {
    const wrapper =  mount(<Highlighting {...highlightProp}/>,  { attachTo: document.body });
    const mock =  new MockAdapter(Axios);
    mock
      .onPost(`${highlightUrl}/api/articles/${highlightProp.slug}/highlight/`)
      .reply(201,  {
        highlight: {
          start: 1,
          end: 2,
          comment: 'Poetic',
          user: {
            username: 'joe'
          }
        },
      });
    wrapper.instance().createHighlight(   { preventDefault: jest.fn()});
    expect(document.getElementById).toBeTruthy();
  });
  it('closes the window', () => {
    const wrapper = mount(<Highlighting {...highlightProp}/>);
    const btn = wrapper.find('.btn-danger');
    btn.simulate('click');
    expect(document.getElementById).toBeTruthy();
  });
  it('calls document.onmouseup', () => {
    const wrapper = mount(<Highlighting {...highlightProp}/> ) ;
    document.getSelection = jest.fn().mockImplementation(
      () => {
        return {
          baseOffset: 1,
          extentOffset: 10,
          toString: jest.fn().mockReturnValue('there is some text here')
        }
      }
    );
    document.onmouseup();
    expect(document.getSelection).toBeCalled();
    const state =  wrapper.instance().state;
    expect(state.start).toEqual(1);
  })
});

