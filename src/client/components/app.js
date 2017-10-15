import React from 'react';
import { BrowserRouter, Switch, Route, browserHistory } from 'react-router-dom';
import { AppBar, Tabs, Tab } from 'material-ui';
import Home from './home.js';
import Main from './main.js';
import StaysView from './staysView.js';
import ChatView from './chatView.js';
import Login from './login.js';
import NotFound from './notfound.js';
import PrivateRoute from './private.js';
import jwt from 'jsonwebtoken';

// App is the top level component that links to the other component
// and is where the router is located.
export default class App extends React.Component {
  constructor(props) {
    super(props);

    const jwt = window.localStorage.getItem('sitnpaws_jwt') || '';
    const loggedIn = !!jwt;

    this.state = {
      isLoggedIn: false,
      jwtToken: '',
      drawerOpen: false,
    }
  }

  onLogin(token) {
    window.localStorage.setItem('sitnpaws_jwt', token);
    this.setState({ isLoggedIn: true, token: token });
  }

  onLogout() {
    window.localStorage.removeItem('sitnpaws_jwt');
    this.setState({ isLoggedIn: false, token: '' });
  }

  getToken() { return this.state.jwtToken; }

  render() {
    return(
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' render={(props) => (
          <Login {...props}
            handleLogin={this.authLogin}
          />
        )}/>
        <PrivateRoute path='/main' checkAuth={this.authLogin} component={Main}/>
        <PrivateRoute path='/stays' checkAuth={this.authLogin} component={StaysView}/>
        <PrivateRoute path='/chat/:stayId' checkAuth={this.authLogin} component={ChatView}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
    )
  }
}
