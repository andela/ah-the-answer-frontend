import React, { Component } from 'react';
import Axios from 'axios';

export default class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    errors: {
      username: {
        error: false,
        message: '',
      },
      email: {
        error: false,
        message: '',
      },
      password: {
        error: false,
        message: '',
      },
      passwordConfirm: {
        error: false,
        message: '',
      },
    },
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  setPasswordState = (msg, err) => {
    this.setState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        passwordConfirm: {
          ...prevState.errors.passwordConfirm,
          message: msg,
          error: err,
        },
      },
    }));
  }

  sendRequest = () => {
    const { username, email, password } = this.state;
    const res = Axios.post(
      'https://ah-the-answer-backend-staging.herokuapp.com/api/users/',
      {
        user: {
          username: username,
          email: email,
          password: password,
        },
      },
    );

    return res;
  }

  handleChange(e) {
    const node = e.target.name;
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
    );
    this.setState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [node]: {
          ...prevState.errors.node,
          message: [],
          error: false,
        },
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(
      {
        loading: true,
      },
    );

    const { password, confirmPassword } = this.state;

    if (password === confirmPassword) {
      this.setPasswordState([], false);
    }

    if (password !== confirmPassword) {
      this.setState(
        {
          loading: false,
        },
      );
      this.setPasswordState(['Passwords do not match'], true);
      return;
    }

    const res = this.sendRequest();

    res.then(
      response => window.location.replace(`/success-signup?email=${response.data.user.email}`),
    ).catch(
      (err) => {
        if (err.response) {
          this.setState(
            {
              loading: false,
            },
          );
          this.renderErrors(err.response.data.errors);
        }
      },
    );
  }

  renderErrors(nodes = null) {
    if (nodes) {
      const keys = Object.keys(nodes);
      keys.map(
        (key) => {
          const keyErrors = nodes[key];
          return this.setState(prevState => ({
            ...prevState,
            errors: {
              ...prevState.errors,
              [key]: {
                ...prevState.errors.key,
                message: keyErrors,
                error: true,
              },
            },
          }));
        },
      );
    }
  }

  render() {
    const {
      username, email, password, confirmPassword, loading, errors,
    } = this.state;
    return (
      <div className="container full-height d-flex align-items-center justify-content-center">
        <div className="col-lg-5">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form className="form-wrapper p-4 shadow" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="usernameID" className="required">Username</label>
              <input
                type="text"
                name="username"
                className={
                  `form-control ${errors.username.error ? ' is-invalid' : ''}`
                }
                value={username}
                id="usernameID"
                required
                onChange={this.handleChange}
              />
              <div className="invalid-feedback" id="usernameFeedback">
                {errors.username.message}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="emailID" className="required">Email</label>
              <input
                type="email"
                name="email"
                className={
                  `form-control ${errors.email.error ? ' is-invalid' : ''}`
                }
                value={email}
                id="emailID"
                required
                onChange={this.handleChange}
              />
              <div className="invalid-feedback" id="emailFeedback">
                {errors.email.message}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="passwordID" className="required">Password</label>
              <input
                type="password"
                name="password"
                className={
                  `form-control ${errors.password.error ? ' is-invalid' : ''}`
                }
                id="passwordID"
                value={password}
                required
                onChange={this.handleChange}
              />
              <div className="invalid-feedback" id="passwordFeedback">
                {errors.password.message}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmpasswordID" className="required">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={
                  `form-control ${errors.passwordConfirm.error ? ' is-invalid' : ''}`
                }
                id="confirmpasswordID"
                value={confirmPassword}
                required
                onChange={this.handleChange}
              />
              <div className="invalid-feedback" id="passwordConfirmFeedback">
                {errors.passwordConfirm.message}
              </div>
            </div>
            <div className="form-group col-6 mx-auto">
              <button
                type="submit"
                className={
                  loading
                    ? 'btn btn-primary btn-block disabled'
                    : 'btn btn-primary btn-block'
                }
              >
                {
                  loading
                    ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
                    : <span>Sign Up</span>
                }
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Already have an account?
            <a href="login"> Sign In</a>
          </p>
        </div>
      </div>
    );
  }
}
