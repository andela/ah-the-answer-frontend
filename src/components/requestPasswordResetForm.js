import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const RequestPasswordResetForm = ({ ...props }) => {
  const {
    email,
    message,
    error,
    handleChange,
    handleSubmit
  }= props
  return (
    <div className="container d-flex align-items-center justify-content-center">
        <div className="col-lg-5">
          <h2 className="text-center mb-4">Password Reset</h2>
          <form className="form-wrapper p-4 shadow" onSubmit={handleSubmit}>
            <div className="form-group">

            <p className="text-center mb-4"> Please enter the Email you signed up with. A reset link will be sent to this email</p>
              <label htmlFor="usernameID" className="required"><h6> Signup Email</h6></label>
              {
                  (message && message.match(/sent/) === null) ? document.getElementById('email').classList.add('is-invalid') : null
              }
              <input type="email" value={email} className="form-control" id="email" aria-describedby="usernameHelp"  onChange={handleChange} required/>
              <div className="invalid-feedback">

                <p>{message}</p>
                
              </div>
            </div>
            <div className="form-group col-6 mx-auto">
              <button type="submit" className="btn btn-primary btn-block">
                Send
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            <Link to="/"> Back Home?</Link>
          </p>
        </div>
      </div>
  )
}

RequestPasswordResetForm.defaultProps ={
  email: '',
};

RequestPasswordResetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.string,
  formstate: PropTypes.string
}

export default RequestPasswordResetForm
