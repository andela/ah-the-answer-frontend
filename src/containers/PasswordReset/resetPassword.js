/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../store/actions/requestResetPassword';

export class ResetPassword extends Component {
    state = {
      password: '',
      confirmPassword: '',
      token: '',
      error: '',
      message: '',
      formstate: '',
    }


    static getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.error !== nextProps.message
           || prevState.message !== nextProps.message
           || prevState.formstate !== nextProps.fromstate
           || prevState.confirmPassword !== nextProps.confirmPassword
           || prevState.password !== nextProps.password) {
        return {
          error: nextProps.error,
          message: nextProps.message,
          formstate: nextProps.formstate,

        };
      }
      return null;
    }

    async componentDidMount() {
      this.setState({ token: this.props.match.params.token });
    }

    handleChange = (e) => {
      this.setState(
        { [e.target.name]: e.target.value },
      );
      document.getElementById('confirmPassword').classList.remove('is-invalid');
      document.getElementById('password').classList.remove('is-invalid');
    }

    handleSubmit = (e) => {
      e.preventDefault();

      if (this.state.password === this.state.confirmPassword && this.state.password.match(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/)) {
        const passwordData = {
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          token: this.state.token,
          message: this.state.message,
          error: this.state.error,
        };
        this.props.resetPassword(passwordData);
      } else if (this.state.password !== this.state.confirmPassword) {
        document.getElementById('confirmPassword').classList.add('is-invalid');
      } else {
        document.getElementById('password').classList.add('is-invalid');
      }
    };

    render() {
      return (
        <div className="container d-flex align-items-center justify-content-center">
          <div className="col-lg-5">
            <h2 className="text-center mb-4">Password Reset</h2>
            <form
              className="form-wrapper p-4 shadow"
              onSubmit={this.handleSubmit}
            >
              <p className="text-center mb-4 text-muted">Please provide a new password</p>
              <div className="form-group">
                <label htmlFor="passwordID" className="required">Password</label>
                <input type="password" className="form-control" id="password" name="password" required onChange={this.handleChange} />
                <div className="invalid-feedback">
                  <p>
                    Please ensure your password is at least 8
                    characters long and contains at least one letter and one numeral
                  </p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmpPassword" className="required">Confirm password</label>
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" required onChange={this.handleChange} />
                <div className="invalid-feedback">
                  <p>
                    Password do not match
                  </p>
                </div>
              </div>
              <div className="form-group col-6 mx-auto">
                <button type="submit" className="btn btn-primary btn-block">
                    Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
}

ResetPassword.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string,
  resetPassword: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  resetPassword: userData => dispatch(resetPassword(userData)),
});

export const mapStateToProps = state => ({
  message: state.resetPassword.message,
  error: state.resetPassword.error,
});

export default connect(
  mapStateToProps,
  { resetPassword },
)(ResetPassword);

// eslint-disable-next-line no-underscore-dangle
export const _ResetPassword = ResetPassword;
