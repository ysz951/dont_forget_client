import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

class Header extends Component {
  // static contextType = CollectionListContext;
  handleLogoutClick = () => {
    // this.context.clearCollectionList();
    TokenService.clearAuthToken();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  }

  renderLogoutLink() {
    return (
      <div className='Header__log_part'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          <FontAwesomeIcon icon='sign-out-alt' />
          {' '}
          Log out
        </Link>
      </div>
    );
  }

  // renderLoginLink() {
  //   return (
  //     <div className='Header__log_part'>
  //       <Link
  //         to='/login'>
            
  //         Log in
  //       </Link>
  //     </div>
  //   );
  // }
  render() {
    return (
      <nav className='Header__name'>
        <h1 className="Header_app_name">
          <Link to='/'>
            Dont Forget
          </Link>
        </h1>
        {
          TokenService.hasAuthToken()
          && this.renderLogoutLink()
        }
      </nav>
    );
  }
}

export default withRouter(Header);