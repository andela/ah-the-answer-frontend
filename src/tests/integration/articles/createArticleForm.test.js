import React from 'react';
import { EditorState } from 'draft-js';
import { mount } from '../../enzyme';
import { CreateArticle } from '../../../containers/articles/CreateArticle';

function createWrapper() {
  const props = {
    errors: {},
    message: {},
    articles: [],
    createArticle: jest.fn(),
    bodyMessage: '',
    message: {
      success: 'Done',
      article: {
        slug: 'slug',
      },
    },
    history: {
      push: jest.fn(),
    },
  }

  const wrapper = mount(<CreateArticle {...props} />, { attachTo: document.body });
  return {
    wrapper,
    props,
  };
}

describe('Create Component', () => {
  it('should render CreateArticle component', () =>  {
    const { wrapper } = createWrapper();

    wrapper.setProps({
      errors: {},
      message: {},
      articles: [],
      createArticle: jest.fn(),
      bodyMessage: '',
      message: {
        success: true,
        article: {
          slug: 'slug',
        },
      },
      history: {
        path: '',
        push: jest.fn(),
      },
    })

    wrapper.setState({
      title: 'title',
      description: 'description',
      body: EditorState.createEmpty(),
      is_published: false,
      redirect: true,
      tags: [],
    })

    const spy = jest.spyOn(wrapper.instance(), 'handleChange');
    const e = {target: {name: '',  value: ''}}
    wrapper.instance().handleChange(e);
    expect(spy).toBeCalledWith(e);


    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const e2 = {
      target: {
        title: { 
          value: ''
        },
        description: {
          value: ''
        }
      }, preventDefault: jest.fn()};
    wrapper.instance().handleSubmit(e2);
    expect(spy2).toBeCalledWith(e2);
  });
});
