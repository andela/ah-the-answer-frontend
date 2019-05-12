import React from 'react';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount } from '../../enzyme';
import store from '../../../store/store';
import { CreateArticle } from '../../../containers/articles/CreateArticle';

const user = {
  username: 'testuser',
  token: 'testtoken',
};
localStorage.setItem('user', JSON.stringify(user));


describe('article creation', () => {
  const wrapper = mount(<CreateArticle />, { attachTo: document.body });
  it('should highlight empty field errors', async () => {
    const title = wrapper.find('input#title');
    const description = wrapper.find('input#description');

    title.simulate('change', {
      target: {
        name: 'title',
        value: '',
      },
    });
    description.simulate('change', {
      target: {
        name: 'description',
        value: '',
      },
    });
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: [{ value: '' }],
    });
    const errorMessage = wrapper.find('#title').props().className;
    expect(errorMessage).toEqual('form-control');
  });
});
