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
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
        },
      ],
    };
    wrapper = mount(<ArticleList {...props} />);
  });
  it('should render article list', () => {
    const response = wrapper.find(`[data-test="articleList"]`);
    expect(response.length).toBe(1);
  });
})