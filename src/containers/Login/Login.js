import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInUser } from '../../store/actions/authActions';
import FbIcon from '../../images/facebook.svg';
import TwitterIcon from '../../images/twitter.svg';
import GoogleIcon from '../../images/google.svg';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  };

<<<<<<< HEAD
  handleSubmit = (e) => {
=======
  handleSubmit = e => {
>>>>>>> 0e51ae870467773d84c25c97461f3ec2cdad36e8
    e.preventDefault();
    this.props.signInUser(this.state);
  };

<<<<<<< HEAD
  handleChange = (e) => {
=======
  handleChange = e => {
>>>>>>> 0e51ae870467773d84c25c97461f3ec2cdad36e8
    e.preventDefault();
    this.setState({
      [e.target.type]: e.target.value,
    });
  };
<<<<<<< HEAD

=======
>>>>>>> 0e51ae870467773d84c25c97461f3ec2cdad36e8
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
<<<<<<< HEAD
                  ? document.getElementById('emailID').classList.add('is-invalid')
                    || document.getElementById('passwordID').classList.add('is-invalid')
=======
                  ? document.getElementById('emailID').classList.add('is-invalid') ||
                    document.getElementById('passwordID').classList.add('is-invalid')
>>>>>>> 0e51ae870467773d84c25c97461f3ec2cdad36e8
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
                className="form-control"
                id="passwordID"
                required
                onChange={this.handleChange}
                data-set="passwordTest"
              />
              <div className="invalid-feedback">{authError}</div>
            </div>
            <div className="form-group col-6 mx-auto">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                id="signInButton"
                data-set="buttonTest"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Forgot Password?
            <Link to="/passwordreset"> Reset Password</Link>
          </p>
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
export const mapStateToProps = state => ({
  authError: state.auth.authError,
  errorMessages: state.auth.errorMessages,
});
export const mapDispatchToProps = dispatch => ({
  signInUser: userData => dispatch(signInUser(userData)),
});
=======
export const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    errorMessages: state.auth.errorMessages,
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    signInUser: userData => dispatch(signInUser(userData)),
  };
};
>>>>>>> 0e51ae870467773d84c25c97461f3ec2cdad36e8

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
