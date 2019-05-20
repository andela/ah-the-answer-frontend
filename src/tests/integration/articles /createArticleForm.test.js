import React from 'react';
import { EditorState } from 'draft-js';
import { mount } from '../../enzyme';
import { CreateArticle } from '../../../containers/articles/CreateArticle';

// describe('Create Component', () => {
//   let wrapper;
//   const mockCreatefn = jest.fn();
//   beforeEach(() => {
//     wrapper = shallow(<CreateArticle createArticle={mockCreatefn} />);
//   });
// //   describe('when the form is submitted', () => {
//   it('should call the mock create function', {
//     wrapper.find('#articleForm').simulate(
//       'submit',
//       {preventDefault() {}}
//     );
//     expect(mockCreatefn().mock.calls.length).toBe(1);
//   });
// //   });
// });

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

    // wrapper.setState({
    //     body: '<p>lorem ipsum dispusm kipsum blah blah</p>',
    // })

    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const e2 = {target: {name: '',  value: ''}, preventDefault: jest.fn()};
    wrapper.instance().handleSubmit(e2);
    expect(spy2).toBeCalledWith(e2);
  });
});
