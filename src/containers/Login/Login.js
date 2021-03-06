import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInUser } from '../../store/actions/authActions';
import GoogleLogin from './google';
import FacebookLogin from './facebook';
import TwitterLogin from './twitter';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signInUser(this.state);
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.type]: e.target.value,
    });
  };

  render() {
    const { authError, errorMessages } = this.props;
    return (
      <div
        className="container d-flex align-items-center justify-content-center"
        data-set="loginTestDiv"
      >
        <div className="col-lg-5">
          <h2 className="text-center mb-4 mt-5">Sign In</h2>
          <form
            className="form-wrapper p-4 shadow"
            onSubmit={this.handleSubmit}
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
                  <FacebookLogin />
                  <GoogleLogin />
                  <TwitterLogin />
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
                onChange={this.handleChange}
                data-set="emailTest"
              />
            </div>
            <div className="form-group mb-5">
              <label htmlFor="passwordID" className="required">
                Password
              </label>
              <input
                type="password"
                className="form-control mb-1"
                id="passwordID"
                required
                onChange={this.handleChange}
                data-set="passwordTest"
              />
              <small>
                Forgot Password?
                {' '}
                <Link to="/passwordreset"> Reset Password</Link>
              </small>
              <div className="invalid-feedback">{authError}</div>
            </div>
            <div className="form-group col-6 mx-auto">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                id="signInButton"
                data-set="buttonTest"
              >
                <span>Sign In</span>
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  authError: state.auth.authError,
  errorMessages: state.auth.errorMessages,
});
export const mapDispatchToProps = dispatch => ({
  signInUser: userData => dispatch(signInUser(userData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
