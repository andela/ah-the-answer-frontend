/* eslint-disable no-undef */
import expect from 'expect';
import RequestPasswordReset from '../../../store/reducers/requestPasswordReset';
import { requestResetPasswordSuccess } from '../../../store/actions/requestResetPassword';

const INITIAL_STATE = {
  error: '',
  message: {},

};

// eslint-disable-next-line no-undef
describe('Test RESETREDUCER', () => {
  it('should return the initial state', () => {
    const state = RequestPasswordReset(INITIAL_STATE, {});
    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle get reset password link success', () => {
    const payload = 'success! reset password link has been sent to your email';
    const resetSuccessAction = requestResetPasswordSuccess(payload);
    const expectedState = {
      ...INITIAL_STATE,
      message: resetSuccessAction.message,

    };
    const state = RequestPasswordReset(INITIAL_STATE, resetSuccessAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle get reset password link error', () => {
    const payload = 'Failed email is not registered';

    const resetFailureAction = requestResetPasswordSuccess(payload);
    const expectedState = {
      ...INITIAL_STATE,
      message: resetFailureAction.message,
    };
    const state = RequestPasswordReset(INITIAL_STATE, resetFailureAction);
    expect(state).toEqual(expectedState);
  });
});
