import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import CurListsPage from './CurListsPage/CurListsPage';
import BuyItemList from './BuyItemList/BuyItemList';
import ShoppingPage from './ShoppingPage/ShoppingPage';
import PublicOnlyRoute from './Route/PublicOnlyRoute';
import PrivateRoute from './Route/PrivateRoute';
import Header from './Header/Header';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import TokenService from './services/token-service';
import LandingPage from './LandingPage/LandingPage';
import AuthApiService from './services/auth-api-service';
import IdleService from './services/idle-service';
import AddList from './AddList/AddList';
import AddItem from './AddItem/AddItem';
import './App.css';
class App extends Component {
  state = { hasError: false }
  // state = { hasError: false, is_visible:false }
  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true }
  };

  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      // this.forceUpdate()
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets();

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
    // this.props.history.push('/');
  }
  render(){
    return (
      <div className='App'>
        <header className='App__header'>
            <Header/>
        </header>
        <main className='App__main'>
          <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={LandingPage}
            />
            <PrivateRoute
              exact
              path={'/buyLists'}
              component={CurListsPage}
              select="Now"
            />
            <PrivateRoute
              exact
              path={'/nextLists'}
              component={CurListsPage}
              select="Next"
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            />
            <PrivateRoute
              path={'/addbuylist'}
              component={AddList}
              select="Now"
            />
            <PrivateRoute
              path={'/buyLists/:listId'}
              component={BuyItemList}
              select="Now"
            />
            <PrivateRoute
              path={`/addBuyItem/:listId`}
              component={AddItem}
              select="Now"
            />
            <PrivateRoute
              exact
              path={'/nextLists/:listId'}
              component={BuyItemList}
              select="Next"
            />

            <PrivateRoute
              path={'/shopping/now/:listId'}
              component={ShoppingPage}
              select="Now"
            />
            
            
             <Route
              component={NotFoundPage}
            />  
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
