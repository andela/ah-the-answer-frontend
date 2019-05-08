import axios from 'axios';

const api = {
  resetPasswordLink: (data) => {
    console.log(data);
    return axios.post('http://127.0.0.1:8000/api/users/reset_password/', data);
  },
  resetPassword: data => axios.put(`http://127.0.0.1:8000/api/users/reset_password/${data.token}/`, data),
};


export const requestResetPasswordSuccess = (message) => {
  console.log(message);
  return {
    type: 'RESET_PASSWORD_SUCCESS',
    message,

  };
};

export const requestResetFailure = error => ({
  type: 'RESET_PASSWORD_FAILURE',
  error,
});

export const requestPasswordReset = ({ email }) => (dispatch) => {
  console.log(email);
  api.resetPasswordLink(email)
    .then((res) => {
      dispatch(requestResetPasswordSuccess(res.data.message));
      if (res.data.message.match(/sent/)) {
        window.location.replace('/passwordresetsuccess');
      }
    })
    .catch((e) => {
      dispatch(requestResetPasswordSuccess(e.response.data.detail));
    });
};


export const resetPassword = data => (dispatch) => {
  api.resetPassword(data)
    .then((res) => {
      dispatch(requestResetPasswordSuccess(res.data.message));
    })
    .catch((e) => {
      console.log(e.response.data.errors.password[0]);
      dispatch(requestResetPasswordSuccess(e.response.data.errors.password[0]));
    });
};
