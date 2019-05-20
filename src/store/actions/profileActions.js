import axios from 'axios';
import * as ProfileAction from '../actionTypes/profileActionTypes';
import authHeader from '../../helpers/authHeader';
import authUser from '../../helpers/authUser';

const configUrls = {
  root: 'https://ah-the-answer-backend-staging.herokuapp.com/api',
};
const user = authUser();
const config = {
  headers: authHeader(),
};

export const fetchFollows = (currentUserProf) => {
  return (dispatch) => {
    return axios.get(
      `${configUrls.root}/follows/count/${currentUserProf}/`,
      config)
      .then((response) => {
        // handle success
        dispatch({
          type: 'profile/FETCH_FOLLOWS',
          followCount: response.data.success[0].follows,
        });
      })
  };
};

export const fetchFollowers = currentUserProf => (dispatch) => {
  return axios.get(`${configUrls.root}/follows/count/${currentUserProf}/`)
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_FOLLOWERS,
        followerCount: response.data.success[1].followers,
      });
    })
};

export const fetchBio = currentUserProf => (dispatch) => {
  return axios.get(
    `${configUrls.root}/profiles/${currentUserProf}/`,
    config)
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_BIO,
        userBio: response.data.profile.user_bio,
      });
    })
};

export const fetchName = currentUserProf => (dispatch) => {
  return axios.get(
    `${configUrls.root}/profiles/${currentUserProf}/`,
    config)
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_NAME,
        givenName: response.data.profile.name,
        userName: response.data.profile.username,
      });
    })
};

export const updateProfile = (name, bio) => (dispatch) => {
  return axios.put(
    `${configUrls.root}/profile/${user.username}/edit/`,
    { profile: { name: name, user_bio: bio } },
    config)
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.UPDATE_PROFILE,
        updateMessage: response.data.success,
      });
    })
};

export const resetProfileUpdate = () => (dispatch) => {
  dispatch({
    type: ProfileAction.RESET_UPDATE_MESSAGE,
    resetUpdateMessage: false,
  });
};
