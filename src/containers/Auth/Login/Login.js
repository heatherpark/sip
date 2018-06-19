import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import loginFormData from './login-form-data';
import { checkValidity, formIsValid, renderFormInputs } from '../../../shared/utility';
import * as actions from '../../../store/actions';
import styles from './Login.css';

import { 
  Button, 
  Form, 
  Header, 
  Segment 
} from 'semantic-ui-react';

class Login extends Component {
  state = {
    loginForm: loginFormData,
    isSignup: false,
    formIsValid: false
  };

  handleInputChange = (value, field) => {
    const updateLoginFormState = prevState => {
      const inputData = prevState.loginForm[field];

      return {
        loginForm: {
          ...prevState.loginForm,
          [field]: {
            ...prevState.loginForm[field],
            value,
            valid: checkValidity(value, inputData.validation),
            touched: true
          }
        }
      };
    };

    const updateFormIsValidState = prevState => ({
      formIsValid: formIsValid(prevState.loginForm)
    });

    this.setState(
      prevState => updateLoginFormState(prevState),
      () => this.setState(prevState => updateFormIsValidState(prevState))
    );
  };

  handleLogin = event => {
    event.preventDefault();

    const { loginForm, isSignup } = this.state;

    this.props.onAuth(
      loginForm.email.value,
      loginForm.password.value,
      isSignup
    );
  };

  handleSwitchAuthMode = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const { loginForm } = this.state;

    return (
      <div className={styles.Login}>
        {this.props.isAuthenticated ? <Redirect to="/" /> : null}
        <Header as="h2" textAlign="center">
          {this.state.isSignup
            ? 'Sign up for an account!'
            : 'Log in to Boba Bar!'}
        </Header>
        <Segment>
          <Form
            className={styles.LoginForm}
            onSubmit={this.handleLogin}>
            {loginForm ? renderFormInputs(loginForm, this.handleInputChange) : null}
            <Button
              fluid
              primary
              disabled={!this.state.formIsValid}>
              {this.state.isSignup ? 'Sign Up' : 'Log In'}
            </Button>
          </Form>
        </Segment>
        <Segment textAlign="center">
          <p>
            {this.state.isSignup
              ? 'Already have an account?'
              : 'New user?'}
            &nbsp;&nbsp;
            <a 
              onClick={this.handleSwitchAuthMode}
              href="#">
              {this.state.isSignup
                ? "Log in here."
                : "Sign up here."}
            </a>
          </p>
        </Segment>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
