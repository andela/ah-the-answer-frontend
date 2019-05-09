import axios from 'axios';
import * as ProfileAction from '../actiontypes/profiles/profileActionTypes';
// export const updateFollows = () => ({
//   type: ProfileAction.UPDATE_FOLLOWS,
// });
const setAxios = require('axios');

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.GUe99Eg95Wbx3b07v-kiUI1njRPNCIiZEt9cA1tf5U0';
setAxios.defaults.headers.common = { Authorization: `Bearer ${token}` };

export const updateFollows = () => (dispatch) => {
  axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/')
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_FOLLOWS,
        followCount: response.data.success[0].follows,
      });
    })
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
};

export const updateFollowers = () => (dispatch) => {
  axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/')
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_FOLLOWERS,
        followerCount: response.data.success[1].followers,
      });
    })
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
};

export const updateBio = () => (dispatch) => {
  axios.get(' http://127.0.0.1:8000/api/profiles/Kyppy/')
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_BIO,
        userBio: response.data.profile.user_bio,
      });
    })
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
};

export const updateName = () => (dispatch) => {
  axios.get(' http://127.0.0.1:8000/api/profiles/Kyppy/')
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_NAME,
        givenName: response.data.profile.name,
        userName: response.data.profile.username,
      });
    })
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
};

export const fetchAvatar = () => (dispatch) => {
  axios.get(' http://127.0.0.1:8000/api/profiles/Kyppy/')
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_AVATAR,
        profilePicture: response.data.profile.avatar_url,
      });
    })
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
};
