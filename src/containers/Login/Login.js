import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInUser } from '../../store/actions/authActions';
import LoginForm from '../../components/Login/LoginForm';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signInUser(this.state);
  };

  handleChange = e => {
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
          <LoginForm
            authError={authError}
            errorMessages={errorMessages}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          <p className="text-center mt-4">
            Forgot Password?
            <Link to="/passwordreset"> Reset Password</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    errorMessages: state.auth.errorMessages,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signInUser: userData => dispatch(signInUser(userData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
