import React from 'react';
import { mount } from '../../enzyme';
import ArticleList from '../../../containers/articles/ArticleList';

describe('render article list', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      articles: [
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 1,
          slug: 'test',
          author: {
            "email": "ryanwire@outlook.com",
            "username": "ryanwire"
          },
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 2,
          slug: 'test',
          author: {
            "email": "ryanwire@outlook.com",
            "username": "ryanwire"
          },
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 3,
          slug: 'test',
          author: {
            "email": "ryanwire@outlook.com",
            "username": "ryanwire"
          },
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 4,
          slug: 'test',
          author: {
            "email": "ryanwire@outlook.com",
            "username": "ryanwire"
          },
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 5,
          slug: 'test',
          author: {
            "email": "ryanwire@outlook.com",
            "username": "ryanwire"
          },
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 5,
          slug: 'test',
          author: {
            "email": "ryanwire@outlook.com",
            "username": "ryanwire"
          },
        },
        {
          title: 'test',
          description: 'description',
          body: 'content <img src="http://res.cloudinary.com/dv85uhrw5/image/upload/v1558446801/fvz7ovpp4dhgmytngcgd.jpg" alt="birdie" style="float:none;height: 100%;width: 95%"/>',
          id: 5,
          slug: 'test',
          author: {
            "email": "ryanwire@outlook.com",
            "username": "ryanwire"
          },
        },
      ],
    };
    wrapper = mount(<ArticleList {...props} />);
  });
  it('should render article list', () => {
    const response = wrapper.find('[data-test="articleList"]');
    expect(response.length).toBe(1);
  });
});
