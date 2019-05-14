import React from 'react';
import { shallow } from '../../enzyme';
import FeaturedArticleList from '../../../containers/articles/FeaturedArticleList';

describe('render featured article list', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      articles: [
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 4,
        },
        {
          title: 'test',
          description: 'description',
          body: 'content',
          id: 5,
        },
      ],
    };
    wrapper = shallow(<FeaturedArticleList {...props} />);
  });
  it('should render featured article list', () => {
    const response = wrapper.find(`[data-test="featuredList"]`);
    expect(response.length).toBe(1);
  });
})