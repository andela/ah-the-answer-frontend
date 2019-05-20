import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createComment, getComments, editComment, deleteComment } from '../../../store/actions/commentActions';
import mockAxios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');
describe('async actions', () => {
  it('Creates a comment', () => {
    const store = mockStore({});
    mockAxios.post.mockResolvedValue({
      response: {},
    });
    const expectedActions = [{ type: 'CREATE_COMMENT', response: { response: {} } }];
    const expectedErrorActions = [{ type: 'CREATE_COMMENT_ERROR', error: { error: {} } }];

    return store
      .dispatch(createComment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(err => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
describe('async actions', () => {
  it('gets comments', () => {
    const store = mockStore({});
    mockAxios.get.mockResolvedValue({
      data: {}
    });
    const expectedActions = [
      {
        type: 'GET_COMMENTS',
        response: {}}
    ];
    const expectedErrorActions = [{ type: 'GET_COMMENTS_ERROR', response: {}}];

    return store.dispatch(getComments()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
    .catch(err => {
      expect(store.getActions()).toEqual(expectedErrorActions);
    });
  });
});

describe('async actions', () => {
  it('edits a comment', () => {
    const store = mockStore({});
    mockAxios.put.mockResolvedValue({
      response: {},
    });
    const expectedActions = [{ type: 'EDIT_COMMENT', response: { response: {} } }];
    const expectedErrorActions = [{ type: 'EDIT_COMMENT_ERROR', error: { error: {} } }];

    return store
      .dispatch(editComment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(err => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('async actions', () => {
  it('deletes a comment', () => {
    const store = mockStore({});
    mockAxios.delete.mockResolvedValue({
      data: {},
    });
    const expectedActions = [{ type: 'DELETE_COMMENTS', response: {} }];
    const expectedErrorActions = [{ type: 'DELETE_COMMENTS_ERROR', error: {} }];

    return store
      .dispatch(deleteComment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch((err) => {
        expect(store.getActions()).toEqual(expectedErrorActions);
      });
  });
});