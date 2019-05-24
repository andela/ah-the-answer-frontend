import React from 'react';
import { shallow } from '../../enzyme';
import ArticleList from '../../../containers/articles/ArticleList';

describe('render article list', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      articles: [],
    };
    wrapper = shallow(<ArticleList {...props} />);
  });
  it('should render loader', () => {
    const response = wrapper.find(`[data-test="articleListNone"]`);
    console.log(wrapper.debug())
    expect(response.length).toBe(1);
  });
});
