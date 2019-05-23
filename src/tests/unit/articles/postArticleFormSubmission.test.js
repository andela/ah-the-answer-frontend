import React from 'react';
import { mount, shallow } from '../../enzyme';
import { CreateArticle } from '../../../containers/articles/CreateArticle';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const testUser = {
  username: 'testuser',
  token: 'testtoken',
}

localStorage.setItem('user', JSON.stringify(testUser));

describe('Create Article component', () => {
  const props = {
    errors: {},
    message: {},
    createArticle: jest.fn(),
  }
  const wrapper = shallow(<CreateArticle {...props} />)
  it('should simulate change event', () => {
    wrapper.setProps({})
    wrapper.setState({
      redirect: false,
    })

    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
    const value = "sjdbsjhdsdajd asjbhd"
    const contentBlock = htmlToDraft(value)
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    const editorValue = EditorState.createWithContent(contentState);

    wrapper.setState({
      body: editorValue,
      title: 'Test article',
      description: 'This is an article for testing'
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
    expect(wrapper.instance().props.createArticle).toBeCalled()
  });
});

describe("Does not create article with errors", () => {
    const props = {
        errors: {},
        message: {},
        createArticle: jest.fn(),
    }
    const wrapper = shallow(<CreateArticle {...props} />)

    it("should not create article if length < 10", () => {
        wrapper.setProps({})
        wrapper.setState({
            redirect: false,
        })
    
        const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
        const value = "se"
        const contentBlock = htmlToDraft(value)
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorValue = EditorState.createWithContent(contentState);
    
        wrapper.setState({
            body: editorValue,
            title: 'Test article',
            description: 'This is an article for testing'
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
        expect(wrapper.instance().props.createArticle).toHaveBeenCalledTimes(0)
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
            { id: 'i', text: { id: '2', text: 'three' } } 
          ]);
      });
      it(' should call handleTagDelete', () => {
        wrapper
          .instance()
          .handleTagDelete(0);
    
        expect(wrapper.state('tags'))
        .toEqual([]);
      });
      it(' should call handleTagAddition', () => {
        const tag = { id: 'i', text: { id: '2', text: 'three' } };
        wrapper
          .instance()
          .handleTagAddition(tag);
    
        expect(wrapper.state('tags'))
        .toEqual([{ id: 'i', text: { id: '2', text: 'three' } }]);
      });
});
