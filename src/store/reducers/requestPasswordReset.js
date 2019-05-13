const INITIAL_STATE = {
  error: '',
  message: '',
};

const RequestPasswordReset = (state = INITIAL_STATE, { type, message, error }) => {
  switch (type) {
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        message,

      };

    case 'RESET_PASSWORD_FAILURE':
      return {
        ...state,
        error,

      };
    default:
      return state;
  }
};

export default RequestPasswordReset;
