import React from 'react';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from "react-router-dom";
import { mount, shallow } from '../../enzyme';
import GoogleLogin from '../../../containers/Login/google';
import { Login } from '../../../containers/Login/Login';


describe('Google component', () => {
  it('it renders the button', () => {
    const wrapper = shallow(<GoogleLogin />);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.type()).toEqual('button');
  });
  it('loads in the login page', () => {
    const testStore = configureMockStore([thunk]);
    const initialState = {
      auth: {
        authError: 'error',
        errorMessages: 'error message',
      },
    };
    let store = testStore(initialState);
    const props = {};
    const wrapper = mount(
        <Provider store={store}>
          <Router>
           <Login {...props}/>
          </Router>
        </Provider>
      );
      const login = wrapper.find(GoogleLogin);
      expect(login.exists()).toEqual(true);
    });
});
