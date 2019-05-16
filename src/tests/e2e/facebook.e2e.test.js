import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import { mount } from '../enzyme';
import FacebookLogin from '../../containers/Login/facebook';

const fbLogin = `${process.env.REACT_APP_API}/api/users/facebook/`;
describe('Facebook SDK function', () => {
  it('test loginCallback', () => {
    const wrapper = mount(<FacebookLogin />);
    const response = {
      status: 'not_authorized',
      authResponse: {
        accessToken: 'sdfadfdafaf',
      },
    };
    const spy = jest.spyOn(wrapper.instance(), 'facebookAuthenticate');
    wrapper.instance().loginCallback(response);
    expect(spy).not.toBeCalledWith(response.authResponse.accessToken);
    const badResponse = {
      status: '',
      authResponse: {
        accessToken: 'sdfadfdafaf',
      },
    };
    wrapper.instance().loginCallback(badResponse);
    expect(spy).not.toBeCalledWith(response.authResponse.accessToken);
  });
  it('calls backend authentication successfully', () => {
    const wrapper = mount(<FacebookLogin />);
    const response = {
      status: 'connected',
      authResponse: {
        accessToken: 'sdfadfdafaf',
      },
    };
    const spy = jest.spyOn(wrapper.instance(), 'facebookAuthenticate');
    const mock = new MockAdapter(Axios);
    mock.onPost(fbLogin)
      .reply(200, {
        user : {
          username: 'A',
          token: 'fadsfasdfdsfas',
        }
      });
    wrapper.instance().loginCallback(response);
    expect(spy).toBeCalledWith(response.authResponse.accessToken);
    global.location.replace = jest.fn();
    expect(global.location.replace ).toBeTruthy();
  });
  it('calls backend authentication and fails', () => {
    const wrapper = mount(<FacebookLogin />);
    const response = {
      status: 'connected',
      authResponse: {
        accessToken: 'sdfadfdafaf',
      },
    };
    const spy = jest.spyOn(wrapper.instance(), 'facebookAuthenticate');
    const mock = new MockAdapter(Axios);
    mock.onPost(fbLogin)
      .reply(400, {
        user: {
          username: 'A',
          token: 'fadsfasdfdsfas',
        }
      });
    wrapper.instance().loginCallback(response);
    expect(spy).toBeCalledWith(response.authResponse.accessToken);
  });
});
