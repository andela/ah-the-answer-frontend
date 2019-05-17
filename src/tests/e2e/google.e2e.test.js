import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import { mount } from '../enzyme';
import GoogleLogin from '../../containers/Login/google';
import { shallow } from "enzyme";
import '../unit/social login/windowActions';

const glogin = `${process.env.REACT_APP_API}/api/users/google/`;

describe('Google SDK function', () => {
  const goodRes = {
    status: {
      signed_in : true,
    },
    id_token: 'adfadsfasdfsdf',
    error: false,
  };
  const badRes = {
    status: {
      signed_in : false,
    },
    id_token: 'adfadsfasdfsdf',
    error: false,
  };
  const badRes2 = {
    status: {
      signed_in : true,
    },
    id_token: 'adfadsfasdfsdf',
    error: true,
  };

  it('throws error on invalid authentication', () => {
    const wrapper = mount(<GoogleLogin />);
    const spy = jest.spyOn(wrapper.instance(), 'getUserDetails');
    wrapper.instance().getUserDetails =  jest.fn();
    wrapper.update();
    wrapper.instance().googleSignInCallback(badRes);
    expect(spy).not.toBeCalled();
  });
  it('calls our backend and is successfully validated', () => {
    const wrapper = mount(<GoogleLogin />);
    const mock = new MockAdapter(Axios);
    mock.onPost(glogin)
      .reply(200, {
          user: {
            username: 'A',
            token: 'fadsfasdfdsfas',
          },
      });
    wrapper.instance().getUserDetails('valid');
    global.location = jest.fn();
    expect(global.location.replace).toBeTruthy();
  });
  it('calls googleSignInCallback', ()=> {
    const wrapper = shallow(<GoogleLogin />);
    wrapper.instance().googleSignInCallback(goodRes);
    expect(window.gapi.client.load).toBeCalled();
  });
  it('calls googleSignInCallback returns error', ()=> {
    const wrapper = shallow(<GoogleLogin />);
    wrapper.instance().googleSignInCallback(badRes2);
    expect(window.gapi.client.load).toBeCalled();
  });
});
