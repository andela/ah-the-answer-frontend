const INITIAL_STATE = {
  error: '',
  message: '',
  formstate: '',
};

const RequestPasswordReset = (state = INITIAL_STATE, { type, message, error }) => {
  switch (type) {
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        message,
        formstate: 'sucess',

      };

    case 'RESET_PASSWORD_FAILURE':
      return {
        ...state,
        error,
        formstate: 'error',
      };
    default:
      return state;
  }
};

export default RequestPasswordReset;
