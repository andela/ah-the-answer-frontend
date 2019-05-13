import moxios from 'moxios';
import { createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../store/reducers/rootReducer';
import { requestResetPasswordSuccess } from '../../../store/actions/requestResetPassword';


const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

describe('Test request reset password successful', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('store is updated successfuly', () => {
    const expectedState = {
      message: 'success',
      error: '',   

    };

    const resetData = 'success';
    const store = testStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,

      });
    });
    store.dispatch(requestResetPasswordSuccess(resetData));
    console.log(store.getState())
    const newstate = store.getState().resetPassword;
    // eslint-disable-next-line no-undef
    expect(newstate).toEqual(expectedState);
  });
});
