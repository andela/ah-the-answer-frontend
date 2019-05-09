/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const signInUser = userData => async (dispatch) => {
  const data = {
    user: {
      ...userData,
    },
  };
  await axios
    .post('https://ah-the-answer-backend-staging.herokuapp.com/api/users/login/', data)
    .then((response) => {
      dispatch({ type: 'USER_SIGN_IN', response });
      window.location.replace('/');
    })
    .catch((err) => {
      // eslint-disable-next-line no-unused-expressions
      err.message !== 'Network Error'
        ? dispatch({ type: 'USER_SIGN_IN_ERROR', err })
        : dispatch({ type: '404_ERROR', err });
    });
};
