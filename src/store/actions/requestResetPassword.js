import axios from 'axios';

const api = {
  // eslint-disable-next-line arrow-body-style
  resetPasswordLink: (data) => {
    return axios.post('https://ah-the-answer-backend-staging.herokuapp.com/api/users/reset_password/', data);
  },
  resetPassword: data => axios.put(`https://ah-the-answer-backend-staging.herokuapp.com/api/users/reset_password/${data.token}/`, data),
};


export const requestResetPasswordSuccess = message => ({
  type: 'RESET_PASSWORD_SUCCESS',
  message,

});

export const requestPasswordReset = ({ email }) => (dispatch) => {
  api.resetPasswordLink(email)
    .then((res) => {
      dispatch(requestResetPasswordSuccess(res.data.message));
      if (res.data.message.match(/sent/)) {
        window.location.replace('/passwordresetsuccess');
      }
      if (res.data.message.match(/24hours/)) {
        document.getElementById('email').classList.add('is-invalid');
      }
    })
    .catch((e) => {
      dispatch(requestResetPasswordSuccess(e.response.data.detail));
      document.getElementById('email').classList.add('is-invalid');
    });
};


export const resetPassword = data => (dispatch) => {
  api.resetPassword(data)
    .then((res) => {
      dispatch(requestResetPasswordSuccess(res.data.message));
      // eslint-disable-next-line no-alert
      alert('Your password has been changed click okay to login');
      if (res.data.message.match(/success/)) {
        window.location.replace('/login');
      }
    })
    .catch((e) => {
      dispatch(requestResetPasswordSuccess(e.response.data.errors.password[0]));
    });
};
