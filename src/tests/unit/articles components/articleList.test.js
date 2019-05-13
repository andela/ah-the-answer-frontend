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
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 2,
          slug: 'test',
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 3,
          slug: 'test',
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 4,
          slug: 'test',
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 5,
          slug: 'test',
        },
      ],
    };
    wrapper = mount(<ArticleList {...props} />);
  });
  it('should render article list', () => {
    const response = wrapper.find('[data-test="articleListNone"]');
    expect(response.length).toBe(1);
  });
});
