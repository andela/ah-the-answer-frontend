import React, { Component } from 'react';
import Axios from 'axios';


export default class SignUp extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
      username: {
        error: false,
        message: ''
      },
      email: {
        error: false,
        message: ''
      },
      password: {
        error: false,
        message: ''
      },
      passwordConfirm: {
        error: false,
        message: ''
      },
    },
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  handleChange(e) {
    let node = e.target.name
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
    this.setState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [node]: {
          ...prevState.errors.node,
          message: [],
          error: false
        }
      }
    }));
  }

  setPasswordState = (message, error) => {
    this.setState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        passwordConfirm: {
          ...prevState.errors.passwordConfirm,
          message: message,
          error: error
        }
      }
    }));
  }

  sendRequest = () => {
    let res = Axios.post(
      'https://ah-the-answer-backend-staging.herokuapp.com/api/users/',
      {
        user: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        },
      },
    );

    return res
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.setPasswordState(['Passwords do not match'], true);
      return
    } else if (this.state.password === this.state.confirmPassword) {
      this.setPasswordState([], false);
    }

    const res = this.sendRequest();

    res.then(
      (response) => window.location.replace(`/success-signup?email=${response.data.user.email}`)
    ).catch(
      (err) => {
        if (err.response) {
          this.renderErrors(err.response.data.errors);
        }
      },
    );
  }

  renderErrors(node = null) {
    for (let key in node){
      if (key && !null) {
        const keyErrors = node[key];
        this.setState(prevState => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            [key]: {
              ...prevState.errors.key,
              message: keyErrors,
              error: true
            }
          }
        })
        );
      }
    }
  }

  render() {
    const { username, email, password, confirmPassword, errors } = this.state;
    return (
      <div className="container full-height d-flex align-items-center justify-content-center">
        <div className="col-lg-5">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form className="form-wrapper p-4 shadow" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="usernameID" className="required">Username</label>
              <input
                type="text"
                name="username"
                className={
                  `form-control ${errors.username.error ? ' is-invalid': '' }`
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
                  `form-control ${errors.email.error ? ' is-invalid': '' }`
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
                  `form-control ${errors.password.error ? ' is-invalid': '' }`
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
                  `form-control ${errors.passwordConfirm.error? ' is-invalid': '' }`
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
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
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
