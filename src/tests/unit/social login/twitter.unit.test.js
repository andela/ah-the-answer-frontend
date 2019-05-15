import React from 'react';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from "react-router-dom";
import { mount, shallow } from '../../enzyme';
import TwitterLogin from '../../../containers/Login/twitter';
import { Login } from "../../../containers/Login/Login";
import './windowActions';

describe('Twitter component', () => {
  it('it renders the button', () => {
    const wrapper = shallow(<TwitterLogin />);
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
    const login = wrapper.find(TwitterLogin);
    expect(login.exists()).toEqual(true);
  });
  it('calls oauth', async ()=> {
    const wrapper = shallow(<TwitterLogin />);
    await wrapper.instance().twitterLogin();
    expect(window.OAuth.initialize).toBeCalled();
  });
  it('calls popup', async ()=> {
    const wrapper = shallow(<TwitterLogin />);
    await wrapper.instance().twitterLogin();
    expect(window.OAuth.popup).toBeCalled();
  });
});
