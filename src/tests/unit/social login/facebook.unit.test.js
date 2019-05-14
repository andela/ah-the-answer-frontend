import React from 'react';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from "react-router-dom";
import { mount, shallow } from '../../enzyme';
import FacebookLogin from '../../../containers/Login/facebook';
import { Login } from '../../../containers/Login/Login';
import { CreateArticle } from "../../../containers/articles/CreateArticle";
import   ReactDOM from 'react-dom';

describe('Facebook component', () => {
  it('it renders the button', () => {
    const wrapper = shallow(<FacebookLogin />);
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
    const login = wrapper.find(FacebookLogin);
    expect(login.exists()).toEqual(true);
  });
  it('the component mounts', () => {
    jest.spyOn(FacebookLogin.prototype, 'componentDidMount');
    mount(<FacebookLogin />);
    expect(FacebookLogin.prototype.componentDidMount.mock.calls.length).toBe(1);
  });
});
