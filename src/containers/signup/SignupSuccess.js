import React from 'react';

const SignupSuccess = () => (
  <div className="container d-flex align-items-center justify-content-center">
    <div className="col-lg-5 col-md-6 col-sm-12 text-center">
      <h2 className="mb-4">
        Sign up successful
      </h2>
      <div className="card shadow text-center p-4 mb-4">
        <p>
          An verification link has been sent to
          <span className="text-info ml-1">
            {new URL(window.location.href).searchParams.get('email')}
          </span>
          . Please activate your account to enable you to log in to your account
        </p>
      </div>
      <a href="/" className="mt-5 mr-5">Home</a>
      <a href="/login" className="mt-5">Login</a>
    </div>
  </div>
);

export default SignupSuccess;
