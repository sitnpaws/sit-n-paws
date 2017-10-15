// libraries
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// material ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// app modules
import MainAppBar from './main-app-bar.js';
import ProfileDrawer from './profile-drawer.js';
import Home from './home.js';
import Login from './login.js';
import StaysView from './staysView.js';
import ChatView from './chatView.js';
import NotFound from './notfound.js';

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

  renderLogin() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route path='/login' render={props => (<Login {...props} onLogin={token => this.onLogin(token))} />)} />
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </MuiThemeProvider>
    );
  }

  renderApp() {
    return (
      <MuiThemeProvider>
        <MainAppBar />
        <br/>
        <Switch>
          <Route path='/listings' component={Listings} />
          <Route path='/stays' component={Stays} />
          <Route path='/chat/:stayId' component={Chats} />
          <Redirect to='/listings' />
        </Switch>
        {/* <div className="search">
            <Search onChange={this.handleSearch}/>
            </div>
            <br/>
        <ListingsContainer listings={this.state.listings} /> */}
        <ProfileDrawer onLogout={() => this.onLogout()} />
      </MuiThemeProvider>
    );
  }

  render() {
    return ( this.state.isLoggedIn ) ? (
      {this.renderLogin()}
    ) : (
      {this.renderApp()}
    );
  }
}
