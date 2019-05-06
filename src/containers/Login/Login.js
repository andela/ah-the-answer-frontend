import React, { Component } from "react";
import FbIcon from "../../images/facebook.svg";
import TwitterIcon from "../../images/twitter.svg";
import GoogleIcon from "../../images/google.svg";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createProject(this.state);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.type]: e.target.value
    });
  };

  render() {
    return (
      <div className="container d-flex align-items-center justify-content-center">
        <div className="col-lg-5">
          <h2 className="text-center mb-4 mt-5">Sign In</h2>
          <form className="form-wrapper p-4 shadow" Validate>
            <div className="form-group">
              <div className="social-login">
                <h5 className="text-center mb-4 mt-5">Sign In with</h5>
                <div
                  className="row mb-5"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-primary button-facebook ml-2 col"
                  >
                    <img src={FbIcon} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger button-gmail ml-2 col"
                  >
                    <img src={GoogleIcon} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-info button-twitter ml-2 mr-2 col"
                  >
                    <img src={TwitterIcon} />
                  </button>
                </div>
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
              />
            </div>
            <div className="form-group col-6 mx-auto">
              <button type="submit" className="btn btn-primary btn-block">
                Sign In
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Forgot Password?
            <a href="login"> Reset Password</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
