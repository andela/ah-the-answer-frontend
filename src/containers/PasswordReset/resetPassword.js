import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {resetPassword} from '../../store/actions/requestResetPassword'
import ResetPasswordForm from '../../components/resetPasswordForm'
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
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.confirmPassword !== this.state.password){
            console.log('helloo')
            this.setState({
                error: "password does not match"
            })
        }else{
            this.setState({
                error: ''
            })
        }
        const password_data = {
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            token: this.state.token,
            message: this.state.message,
            error: this.state.error
        };
        console.log(password_data)
        
        this.props.resetPassword(password_data);
        console.log(this.state)
    }
  render() {
      let { error} = this.state
      const {
          password, confirmPassword, message
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

