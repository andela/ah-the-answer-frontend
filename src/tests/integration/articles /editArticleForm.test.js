import React from 'react';
import { EditorState } from 'draft-js';
import { mount } from '../../enzyme';
import { EditArticle } from '../../../containers/articles/EditArticle';

function createWrapper() {
  const props = {
    article: {},
    errors: {},
    message: {},
    editMessage: {},
    deleteMessage: {},
    updateArticle: jest.fn(),
    getArticle: jest.fn(),
    deleteArticle: jest.fn(),
    history: {
      push: jest.fn(),
    },
    match: {
      params: {},
    },
  };

  const wrapper = mount(<EditArticle {...props} />, { attachTo: document.body });
  return {
    wrapper,
    props,
  };
}

describe('Update Component', () => {
  it('should render Update article component', () => {
    const { wrapper } = createWrapper();
    wrapper.setState({
      title: 'title',
      description: 'description',
      body: EditorState.createEmpty(),
      is_published: false,
      tags: [],
    });
  });
});
