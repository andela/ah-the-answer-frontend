import React from 'react';
import { mount, shallow } from '../../enzyme';
import GoogleLogin from '../../../containers/Login/google';


describe('Google component', () => {
  it('it renders the button', () => {
    const wrapper = shallow(<GoogleLogin />);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.type()).toEqual('button');
  });
  // it('loads in the login page', () => {
  //   const props = {};
  //   const wrapper = mount(
  //     <Provider>
  //       <Login />
  //     </Provider>
  //   );
  //   const login = wrapper.find(GoogleLogin);
  //   expect(login.exists()).toEqual(true);
  // });
});
