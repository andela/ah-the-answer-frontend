import React, { Component } from 'react';
import RequestPasswordResetForm from'./requestPasswordResetForm'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {requestPasswordReset} from '../../store/actions/requestResetPassword'

export class InitiatePasswordReset extends Component {
  state = {
      email: '',
      errors: {},
      message: '',
      error: '',
      formstate: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.error !== nextProps.error
        || prevState.message !== nextProps.message
        || prevState.formstate !== nextProps.formstate){
            return {
                error: nextProps.error,
                message: nextProps.message,
                formstate: nextProps.formstate
            }
    }
    return null
}

  handleChange = (e) => {
      this.setState(
          {email: e.target.value}
      )
      
      if(document.getElementsByClassName('is-invalid').length !== 0){
         const ellement = document.getElementById('email')
         ellement.classList.remove('is-invalid')
    
      }
      
  }
  handleSubmit = (e) =>{
      e.preventDefault() 
    const email = {
            email: this.state.email
        }

    this.props.requestPasswordReset({email})
  }

  render() {
    const {
        email, error, message, formstate
      } = this.state;
    return (
        
        <RequestPasswordResetForm
         handleChange={this.handleChange} 
         handleSubmit={this.handleSubmit}
         email = {email}
         error = {error}
         message = {message}
         formstate = {formstate}/>
    );
  }
}



InitiatePasswordReset.propTypes = {
    message: PropTypes.string,
    error: PropTypes.string,
    formstate: PropTypes.string,
    requestPasswordReset: PropTypes.func.isRequired
}


export const mapStateToProps = (state) => {
    return {
        message: state.resetPassword.message,
        error: state.resetPassword.error,
        formstate: state.resetPassword.formstate
    }
}


export default connect(
    mapStateToProps,
    {requestPasswordReset}
)(InitiatePasswordReset)

export const _InitiatePasswordReset = InitiatePasswordReset