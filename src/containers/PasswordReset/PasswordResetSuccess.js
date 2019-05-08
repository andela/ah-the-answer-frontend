import React from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordMessage = () => (
  <div className="container d-flex align-items-center justify-content-center">
    <div className="col-lg-6 p-4 shadow">
      <h2 className="text-center mb-4">Password Reset</h2>
      <p className="text-center mb-4"> A reset link has been sent to your email.</p>
      <p className="text-center mt-4">
        <Link to="/"> Back Home?</Link>
      </p>
    </div>
  </div>
);

export default ResetPasswordMessage;
