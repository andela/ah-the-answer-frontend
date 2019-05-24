import React from 'react';
import { mount } from '../../enzyme';
import ArticleSummary from '../../../containers/articles/ArticleSummary';

describe('render article summary', () => {
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
    wrapper = mount(<ArticleSummary {...props} />);
  });
  it('should render article summary', () => {
    const response = wrapper.find(`[data-test="articleSummary"]`);
    expect(response.length).toBe(1);
  });
})