/* eslint-disable no-undef */
import moxios from 'moxios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../store/reducers/rootReducer';
import { createComment, editComment } from '../../../store/actions/commentActions';

const testStore = initialState => {
  const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleWare(rootReducer, initialState);
};

describe('Test comment creation successful', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Store is updated successfully with new', () => {
    const expectedState = {
      success: 'Comment created successfully',
      comment: {
        id: 106,
        createdAt: '2019-05-14T17:12:06.965557Z',
        updatedAt: '2019-05-14T17:12:06.965582Z',
        body: 'Good article. Really enjoyed it - Updated',
        article: {
          slug: 'hello-world-933bf0cb9966',
        },
        author: {
          email: 'lewiikamaa8@gmail.com',
          username: 'lewiikamaa8@gmail.com',
        },
      },
    };
    const userData = { body: 'Good article. Really enjoyed it' };
    const slug = 'hello-world-933bf0cb9966';
    const store = testStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: expectedState,
      });
    });
    return store.dispatch(createComment(slug, userData)).then(() => {
      const newState = store.getState();
      expect(newState.comments.message.success).toBe('Comment created successfully');
      expect(newState.comments.message.comment.id).toEqual(106);
      expect(newState.comments.message.comment.createdAt).toEqual('2019-05-14T17:12:06.965557Z');
      expect(newState.comments.message.comment.updatedAt).toEqual('2019-05-14T17:12:06.965582Z');
      expect(newState.comments.message.comment.body).toEqual(
        'Good article. Really enjoyed it - Updated',
      );
    });
  });
});

describe('Test comment edited successfull', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Store is updated successfully with new', () => {
    const expectedState = {
      success: 'Comment updated successful',
      comment: {
        id: 128,
        createdAt: '2019-05-14T22:29:32.699352Z',
        updatedAt: '2019-05-15T19:20:39.371435Z',
        body: 'Good article. Really enjoyed it - Updated',
        article: {
          slug: 'another-one-f74046ab3893',
        },
        author: {
          email: 'johndoe@gmail.com',
          username: 'johndoe',
        },
      },
    };
    const userData = { body: 'Good article. Really enjoyed it(Updated)' };
    const slug = 'hello-world-933bf0cb9966';
    const store = testStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });
    return store.dispatch(editComment(slug, userData, 128)).then(() => {
      const newState = store.getState();
      console.log(newState);
    });
  });
});
