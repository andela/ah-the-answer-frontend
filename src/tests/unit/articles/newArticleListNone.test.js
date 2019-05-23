import React from 'react';
import { mount } from '../../enzyme';
import NewArticleList from '../../../containers/articles/NewArticleList';

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
      ],
    };
    wrapper = mount(<NewArticleList {...props} />);
  });
  it('should render loader', () => {
    const response = wrapper.find(`[data-test="newArticleListNone"]`);
    expect(response.length).toBe(1);
  });
});
