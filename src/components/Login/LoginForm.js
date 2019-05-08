/* eslint-disable react/prop-types */
import React from 'react';
import FbIcon from '../../images/facebook.svg';
import TwitterIcon from '../../images/twitter.svg';
import GoogleIcon from '../../images/google.svg';

const LoginForm = (props) => {
  const {
    authError, errorMessages, handleChange, handleSubmit,
  } = props;
  return (
    <form
      className="form-wrapper p-4 shadow"
      onSubmit={handleSubmit}
      validate="true"
      data-set="formTestDiv"
    >
      <div className="form-group">
        <div className="social-login">
          {authError
            ? document.getElementById('emailID').classList.add('is-invalid')
              || document.getElementById('passwordID').classList.add('is-invalid')
            : null}

          <h5 className="text-center mb-4 mt-5">Sign In with</h5>
          <div className="row mb-5" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-primary button-facebook ml-2 col">
              <img src={FbIcon} alt="facebook icon" />
            </button>
            <button type="button" className="btn btn-danger button-gmail ml-2 col">
              <img src={GoogleIcon} alt="google icon" />
            </button>
            <button type="button" className="btn btn-info button-twitter ml-2 mr-2 col">
              <img src={TwitterIcon} alt="twitter icon" id="errorMessages" />
            </button>
          </div>
          <div className="text-center text-danger">
            {errorMessages ? <p>{errorMessages}</p> : null}
          </div>
          <hr className="mb-2" />
          <p className="text-center mb-4">or</p>
        </div>
        <label htmlFor="emailID" className="required">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="emailID"
          aria-describedby="emailHelp"
          required
          onChange={handleChange}
          data-set="emailTest"
        />
      </div>
      <div className="form-group mb-5">
        <label htmlFor="passwordID" className="required">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordID"
          required
          onChange={handleChange}
          data-set="passwordTest"
        />
        <div className="invalid-feedback">{authError}</div>
      </div>
      <div className="form-group col-6 mx-auto">
        <button type="submit" className="btn btn-primary btn-block" id="signInButton" data-set="buttonTest">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
