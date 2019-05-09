/* eslint-disable no-undef */
import moxios from 'moxios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../store/reducers/rootReducer';
import { signInUser } from '../../../store/actions/authActions';

const testStore = (initialState) => {
  const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleWare(rootReducer, initialState);
};

describe('Test Sign in successful', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Store is updated successfully', () => {
    const expectedState = {
      user: {
        email: 'johndoe@gmail.com',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.d6RVuVagvWaS_VQKbs5X1Le3W2t9VNPAVfbdI4dyaDs',
        username: 'johndoe',
      },
    };
    const userData = { email: 'johndoe@test.com', password: 'johndoe123' };
    const store = testStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });
    return store.dispatch(signInUser(userData)).then(() => {
      const newState = store.getState();
      expect(newState.auth.is_authenticated).toBe(true);
      expect(newState.auth.auth.token).toEqual(expectedState.user.token);
    });
  });
});
describe('Test Sign in unsuccessful', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Store is updated successfully with error responses', () => {
    const expectedState = {
      errors: {
        error: ['A user with this email and password was not found.'],
      },
    };

    const userData = { email: 'bademail@test.com', password: 'badpassword' };
    const store = testStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedState,
      });
    });
    return store.dispatch(signInUser(userData)).then(() => {
      const newState = store.getState();
      expect(newState.auth.is_authenticated).toBe(false);
      expect(newState.auth.authError).toEqual(expectedState.errors.error[0]);
    });
  });
});


