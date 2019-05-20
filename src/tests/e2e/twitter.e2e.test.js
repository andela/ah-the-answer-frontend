import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import { mount, shallow } from '../enzyme';
import TwitterLogin from '../../containers/Login/twitter';

const twitterURL = `${process.env.REACT_APP_API}/api/users/twitter/`;
describe('Twitter SDK function', () => {
  const goodRes = {
    status: {
      signed_in: true,
    },
    id_token: 'adfadsfasdfsdf',
    error: false,
  };
  const badRes = {
    status: {
      signed_in: false,
    },
    id_token: 'adfadsfasdfsdf',
    error: false,
  };
  it('successfully redirects', () => {
    const wrapper = shallow(<TwitterLogin />);
    const mock = new MockAdapter(Axios);
    mock.onPost(twitterURL).reply(
      200,
      {
        data: {
          user: {
            username: 'A',
            token: 'fadsfasdfdsfas',
          },
        },
      },
    );
    global.OAuth = jest.fn();
    global.location.replace = jest.fn();
    expect(global.location.replace).toBeTruthy();
  });
});
