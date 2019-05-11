import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { updateArticle } from '../../../store/actions/articleActions';

jest.mock('axios');

describe('Test the updating of an article action', () => {
  it('tests changing article action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.put.mockResolvedValue({
      data: {},
    });
    const expectedAction = [
      {
        type: 'UPDATE_ARTICLE_SUCCESSFUL',
        response: {
          data: {},
        },
      },
    ];
    return store.dispatch(updateArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
//   it('tests update error message', async () => {
//     const testStore = configureMockStore([thunk]);
//     let store = testStore({});
//     mockAxios.put.mockImplementationOnce(() => 
//       Promise.reject({
//         error: {
//           response: {
//             data: "error while updating"
//           },
//         }, 
//       })
//     );
//     try {
//       await store.dispatch(updateArticle());
//     } catch {
//       const actions = store.getActions();
//       console.log(actions)
//     //   expect.assertions(3);
//       expect(actions[0].type).toEqual("UPDATE_ARTICLE_SUCCESSFUL");
//       expect(actions[1].type).toEqual("UPDATE_ARTICLE_FAILED");
//       expect(actions[1].payload.error).toEqual("error while updating");
//     }
//   });
});