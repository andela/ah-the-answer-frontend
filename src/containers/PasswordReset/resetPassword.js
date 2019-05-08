import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {resetPassword} from '../../store/actions/requestResetPassword'
import ResetPasswordForm from './resetPasswordForm'
class ResetPassword extends Component {
    state = {
        password: '',
        confirmPassword: '',
        token: '',
        error: '',
        message: '',
        formstate: ''
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.error !== nextProps.message
           || prevState.message !== nextProps.message
           || prevState.formstate !== nextProps.fromstate
           || prevState.confirmPassword!== nextProps.confirmPassword
           || prevState.password!== nextProps.password){
               return {
                error: nextProps.error,
                message: nextProps.message,
                formstate: nextProps.formstate

               }
           }
           return null
    }

    async componentDidMount() {
        this.setState({token: this.props.match.params.token})
    }

    handleChange = (e) => {
        this.setState(
            { [e.target.name]: e.target.value})                          
        
    }
    
    handleSubmit = (e, func) => {
        e.preventDefault();
        if (this.state.password ===  this.state.confirmPassword){
            const password_data = {
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                token: this.state.token,
                message: this.state.message,
                error: this.state.error
            };
            this.props.resetPassword(password_data);
        }else {
            document.getElementById('confirmPassword').classList.add('is-invalid')
             }
        
    };
  render() {
      
      
      const {
          error, password, confirmPassword, message
      } = this.state
    return (
       <ResetPasswordForm
        confirmPassword = {confirmPassword}
        password = {password}
        message = {message}
        error={error}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}/>
    )
  }
}

ResetPassword.propTypes = {
    message: PropTypes.string,
    error: PropTypes.string,
    resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        message: state.resetPassword.message,
        error: state.resetPassword.error
   } 
};

export default connect(
    mapStateToProps,
    {resetPassword})
    (ResetPassword)


export const _ResetPassword = ResetPassword

