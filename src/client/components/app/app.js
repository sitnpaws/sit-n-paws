// libraries
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// material ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// app modules or components
import MainAppBar from './main-app-bar.js';
import ProfileDrawer from '../profile/profile-drawer.js';
import Login from '../login/login.js';
import Home from '../login/home.js';
import Listings from '../listings/listings.js';
import Stays from '../stays/stays.js';
import Chat from '../chat/chat.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const jwt = window.localStorage.getItem('sitnpaws_jwt') || '';
    this.state = {
      isLoggedIn: !!jwt,
      jwtToken: jwt,
      drawerOpen: false,
    }

    this.getToken = this.getToken.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() { this.setState({drawerOpen: !this.state.drawerOpen}); }

  onLogin(token) {
    window.localStorage.setItem('sitnpaws_jwt', token);
    this.setState({ isLoggedIn: true, jwtToken: token });
  }

  onLogout() {
    window.localStorage.removeItem('sitnpaws_jwt');
    this.setState({ isLoggedIn: false, jwtToken: '' });
  }

  getToken() { return this.state.jwtToken; }

  renderLogin() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route path='/login' render={props => (<Login {...props} onLogin={token => this.onLogin(token)} />)} />
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </MuiThemeProvider>
    );
  }

  renderApp() {
    return (
      <MuiThemeProvider>
        <div>
          <MainAppBar toggleDrawer={this.toggleDrawer} />
          <Switch>
            <Route path='/listings' render={props => (<Listings {...props} getToken={this.getToken} />)} />
            <Route path='/stays' render={props => (<Stays {...props} getToken={this.getToken} />)} />
            <Route path='/chat/:stayId' render={props => (<Chat {...props} getToken={this.getToken} />)} />
            <Redirect to='/listings' />
          </Switch>
          <ProfileDrawer getToken={this.getToken} onLogin={token => this.onLogin(token)} onLogout={() => this.onLogout()} drawerOpen={this.state.drawerOpen} toggleDrawer={this.toggleDrawer} />
        </div>
      </MuiThemeProvider>
    );
  }

  render() {
    return ( this.state.isLoggedIn ) ? (
      this.renderApp()
    ) : (
      this.renderLogin()
    );
  }
}
