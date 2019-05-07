import axios from 'axios'
import * as ProfileAction from '../actiontypes/profiles/profileActionTypes';
// export const updateFollows = () => ({
//   type: ProfileAction.UPDATE_FOLLOWS,
// });

export const updateFollows = () => {
  return (dispatch) => {
    axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/')
      .then((response) => {
        // handle success
        dispatch({ type: ProfileAction.UPDATE_FOLLOWS, followCount: response.data.success[0].follows });
      })
      .catch((error) => {
        // handle error
        console.log('Error fecthing and parsing data', error);
      });
  };
};

export const updateFollowers = () => ({
  type: ProfileAction.UPDATE_FOLLOWERS,
});
