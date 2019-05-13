import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestPasswordResetForm from './requestPasswordResetForm';
import { requestPasswordReset } from '../../store/actions/requestResetPassword';

export class InitiatePasswordReset extends Component {
  state = {
    email: '',
    message: '',
    error: '',
    formstate: '',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.error !== nextProps.error
        || prevState.message !== nextProps.message
        || prevState.formstate !== nextProps.formstate) {
      return {
        error: nextProps.error,
        message: nextProps.message,
        formstate: nextProps.formstate,
      };
    }
    return null;
  }

  handleChange = (e) => {
    this.setState(
      { email: e.target.value },
    );

    if (document.getElementsByClassName('is-invalid').length !== 0) {
      const ellement = document.getElementById('email');
      ellement.classList.remove('is-invalid');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const email = {
      email: this.state.email
    };

    // eslint-disable-next-line react/destructuring-assignment
    this.props.requestPasswordReset({ email });
  }

  render() {
    const {
      email, error, message, formstate,
    } = this.state;
    return (

      <RequestPasswordResetForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        email={email}
        error={error}
        message={message}
        formstate={formstate}
      />
    );
  }
}

InitiatePasswordReset.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  message: PropTypes.string.isRequired,
  error: PropTypes.string,
  formstate: PropTypes.string,
  requestPasswordReset: PropTypes.func.isRequired,
};


export const mapStateToProps = state => ({
  message: state.resetPassword.message,
  error: state.resetPassword.error,
  formstate: state.resetPassword.formstate,
});


export default connect(
  mapStateToProps,
  { requestPasswordReset },
)(InitiatePasswordReset);

// eslint-disable-next-line no-underscore-dangle
export const _InitiatePasswordReset = InitiatePasswordReset;
