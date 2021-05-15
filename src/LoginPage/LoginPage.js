import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import './LoginPage.css';
export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/buyLists';
    history.push(destination);
  };

  render() {
    return (
      <section className='LoginPage'>
        {/* <h2>Login</h2> */}
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        <p>
          <span>New user?</span>
          <Link className="LoginPage_Sign_up" to='/register'> Creat an account</Link>
        </p>
      </section>
    );
  }
}
