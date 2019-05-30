import React from 'react';
import { shallow } from '../../enzyme';
import ArticleList from '../../../containers/articles/ArticleList';

describe('render article list', () => {
  let wrapper, wrapper2;
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
    const props2 = { articles: [] }
    wrapper = shallow(<ArticleList {...props} />);
    wrapper2 = shallow(<ArticleList {...props2} />)
  });
  it('should render article list', () => {
    const response = wrapper.find('[data-test="articleList"]');
    expect(response.length).toBe(1);
  });
});
