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

export const updateFollowers = () => {
  return (dispatch) => {
    axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/')
      .then((response) => {
        // handle success
        dispatch({ type: ProfileAction.UPDATE_FOLLOWERS, followerCount: response.data.success[1].followers });
      })
      .catch((error) => {
        // handle error
        console.log('Error fecthing and parsing data', error);
      });
  };
};

export const updateBio = () => {
  return (dispatch) => {
    axios.get(' http://127.0.0.1:8000/api/profiles/Kyppy/')
      .then((response) => {
        // handle success
        dispatch({ type: ProfileAction.UPDATE_BIO, followerCount: response.data.profile.user_bio });
      })
      .catch((error) => {
        // handle error
        console.log('Error fecthing and parsing data', error);
      });
  };
};
