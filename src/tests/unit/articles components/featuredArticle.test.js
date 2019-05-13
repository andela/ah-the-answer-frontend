import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from '../../enzyme';
import FeaturedArticleSummary from '../../../containers/articles/FeaturedArticleSummary';

describe('render featured article', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      article: {
        title: "test",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue magna ut hendrerit efficitur. Morbi lacinia, metus nec imperdiet iaculis, erat leo fringilla nisi, non consectetur nisl orci eu libero. Integer nunc leo, tristique ut pulvinar non, tristique quis tellus. Aenean rutrum urna vel neque egestas",
        body: "content",
        author: {
            username: "polmog",
        },
      },
    };
    wrapper = mount(<Router><FeaturedArticleSummary {...props} /></Router>);
  });
  it('should render the summary of a featured article', () => {
    const response = wrapper.find(`[data-test="featuredArticle"]`);
    expect(response.length).toBe(1);
  });
})