/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const ResetPasswordForm = ({ ...props }) => {
  const {
    error,
    message,
    confirmPassword,
    password,
    handleChange,
    handleSubmit
  } = props;
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="col-lg-5">
        <h2 className="text-center mb-4">Password Reset</h2>
        <form className="form-wrapper p-4 shadow" onSubmit={handleSubmit}>
          <p className="text-center mb-4 text-muted">Please provide a new password</p>
          <div className="form-group">
            <label htmlFor="usernameID" className="required">Email</label>
            <input type="email" className="form-control" value="some@email.com" id="usernameID" aria-describedby="usernameHelp" disabled />
          </div>
          <div className="form-group">
          <label htmlFor="passwordID" className="required">Password</label>
            {
               (message && message.match(/Please ensure/)) ? document.getElementById('password').classList.add('is-invalid') : null
              }
            <input type="password" className="form-control" id="password" name="password" required onChange={handleChange} />
            <div className="invalid-feedback">
             <p>Please ensure your password is at least 8 characters long and contains at least one letter and one numeral</p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmpasswordID" className="required">Confirm Password</label>
            {
               error ? document.getElementById('confirmPassword').classList.add('is-invalid') : null
              }
            <input type="confirmpasswordID" className="form-control" id="confirmPassword" name="confirmPassword" required onChange={handleChange} />
            <div className="invalid-feedback">
              <p>Password does not match</p>
            </div>
          </div>
          <div className="form-group col-6 mx-auto">
            <button type="submit" className="btn btn-primary btn-block">
                Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
