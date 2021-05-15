import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import './LoginForm.css';
export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };
  state = { error: null };

  handleSubmitBasicAuth = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;
    AuthApiService.postLogin({
      username: user_name ? user_name.value : "ysz951",
      password: password ? password.value : "ysz951",
    })
      .then(res => {
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  };

  render() {
    const {error} = this.state;
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitBasicAuth}
      >
        <fieldset>
          <legend className="Acme">
            Log in
          </legend>
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>
          <div className='user_name'>
            <label htmlFor='LoginForm__user_name'>
              User name
            </label>
            <input
              className="user_name"
              name='user_name'
              id='LoginForm__user_name'
              placeholder="test"
              required
            />
          </div>
          <div className='password'>
            <label htmlFor='LoginForm__password'>
              Password
            </label>
            <input
              className="password"
              name='password'
              type='password'
              id='LoginForm__password'
              placeholder="password"
              required
            />
          </div>
          <button className="LoginFrom_submit_btn btn_type_1" type='submit'>
            Login
          </button>
          {' '}
          <button className="LoginFrom_submit_btn btn_type_1" id ="demo" type='button' onClick={this.handleSubmitBasicAuth}>
            Demo user login
          </button>
        </fieldset>
      </form>
    );
  }
}
