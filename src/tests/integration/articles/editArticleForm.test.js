import React from 'react';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { shallow } from '../../enzyme';
import { EditArticle } from '../../../containers/articles/EditArticle';

const testUser = {
  username: 'testuser',
  token: 'testtoken',
}

localStorage.setItem('user', JSON.stringify(testUser));

describe('Update Component', () => {
  const props = {
    article: {
      body: 'tadasbdbasdnbasdnasdnsnda',
      title: 'Test article',
      description: 'This is an article for testing',
      author: {
        username: "testuser",
      },
      tags: [
        { id: "1", text: "two" },
        { id: "2", text: "three" },
      ],
      is_published: true,
    },
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
  const value = "sjdbsjhdsdajd asjbhd"
  const contentBlock = htmlToDraft(value)
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
  const editorValue = EditorState.createWithContent(contentState);
  const wrapper = shallow(<EditArticle {...props}/>);
  it('should render Update article component', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.setState({
      body: editorValue,
      title: 'Test article',
      description: 'This is an article for testing',
      tags: [
        { id: "1", text: "two" },
        { id: "2", text: "three" },
      ],
      is_published: true,
    })

    wrapper.find('form').simulate('submit', {
        target: {
            title: {
                value: 'Hello test'
            },
            description: {
                value: "This is a test description"
            }
        },
        preventDefault: jest.fn()
    })

    expect(spy).toBeCalled()
    expect(wrapper.instance().props.updateArticle).toBeCalled()
  });
  it(' should onEditorStateChange function', () => {
    wrapper
      .instance()
      .onEditorStateChange(editorValue);

    expect(wrapper.state('body'))
      .toEqual(editorValue);
  });
  it('render componentWillReceiveProps with change', () => {
    const nextProps = {
      article: {
        body: value,
        title: 'Test article',
        description: 'This is an article for testing',
        tags: [
          { id: "1", text: "two" },
          { id: "2", text: "three" },
        ],
       },
    };
    wrapper.setProps({ nextProps });
    expect(wrapper.state().title).toEqual('Test article');
    expect(wrapper.state().description).toEqual('This is an article for testing');
    expect(wrapper.state().tags).toEqual([ 
      { id: 'i', text: { id: '1', text: 'two' } },
      { id: 'i', text: { id: '2', text: 'three' } }
    ]);
  });
  it(' should call handleTagDrag', () => {
    const tag =  { id: 'i', text: { id: '2', text: 'three' } };
    const currPos = 1;
    const newPos = 0;
    wrapper
      .instance()
      .handleTagDrag(tag, currPos, newPos);

    expect(wrapper.state('tags'))
      .toEqual([
        { id: 'i', text: { id: '2', text: 'three' } },
        { id: 'i', text: { id: '1', text: 'two' } }
      ]);
  });
  it(' should call handleTagDelete', () => {
    wrapper
      .instance()
      .handleTagDelete(0);

    expect(wrapper.state('tags'))
    .toEqual([
      { id: 'i', text: { id: '1', text: 'two' } }
    ]);
  });
  it(' should call handleTagAddition', () => {
    const tag = { id: 'i', text: { id: '2', text: 'three' } };
    wrapper
      .instance()
      .handleTagAddition(tag);

    expect(wrapper.state('tags'))
    .toEqual([
      { id: 'i', text: { id: '1', text: 'two' } },
      { id: 'i', text: { id: '2', text: 'three' } }
    ]);
  });
});
