import React from 'react';
import { mount, shallow } from '../../enzyme';
import FacebookLogin from '../../../containers/Login/facebook';



describe('Facebook component', () => {
  it('it renders the button', () => {
    const wrapper = shallow(<FacebookLogin />);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.type()).toEqual('button');
  });
  // it('loads in the login page', () => {
  //   const wrapper = mount(
  //     <Router>
  //       <Login/>
  //     </Router>
  //   );
  //   const login = wrapper.find(FacebookLogin);
  //   expect(login.exists()).toEqual(true);
  // });
  it('the component mounts', () => {
    jest.spyOn(FacebookLogin.prototype, 'componentDidMount');
    mount(<FacebookLogin />);
    expect(FacebookLogin.prototype.componentDidMount.mock.calls.length).toBe(1);
  });
});
