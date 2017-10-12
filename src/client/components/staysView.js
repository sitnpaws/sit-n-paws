import React from 'react';
import ListingsContainer from './listingsContainer.js';
import PostListing from './PostListing.js';
import ProfileUpdate from './profileForm.js';
import ShowProfile from './showProfile.js';
import Stays from './stays.js';
import Search from './search.js'
import masterUrl from '../utils/masterUrl.js';
import request from 'superagent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Pets from 'material-ui/svg-icons/action/pets';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

// This component is the upper level component for all other components.
export default class StaysView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      renderProfile: false
    };
    // Drawer - Styles for the side drawer buttons
    this.styles = {
      margin: 40,
    };

    this.touchTap = this.touchTap.bind(this);
    this.logoutOnClick = this.logoutOnClick.bind(this);
    this.profileOnClick = this.profileOnClick.bind(this);
    this.backToMain = this.backToMain.bind(this);
  }

  // Drawer - Opens the side drawer for my profile
  touchTap() {
    this.setState({openDrawer: !this.state.openDrawer});
  }

  // Drawer - Handles logout by removing jwt token and refreshing the page
  logoutOnClick(event) {
    localStorage.removeItem('jwt');
    window.location.reload();
  }

  // Drawer - Renders Edit Your Profile when Edit Profile button is clicked
  profileOnClick(event) {
    this.setState({renderProfile: !this.state.renderProfile});
  }

  backToMain() {
    // Redirect to Main Component
  }

  componentDidMount() {

  }

  // Renders AppBar, Search, Drawer, and PostListing
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Stays & Requests"
            iconElementLeft={<IconButton><Pets/></IconButton>}
            iconElementRight={<IconButton><NavigationMenu/></IconButton>}
            onRightIconButtonTouchTap={this.touchTap}
            onLeftIconButtonTouchTap={this.backToMain}
            style={{background: 'rgb(197, 186, 155)'}}
          >
          </AppBar>
          <Stays />
          <Drawer width={400} openSecondary={true} open={this.state.openDrawer} >
            <AppBar title="Sit-n-Paws Profile" onLeftIconButtonTouchTap={this.touchTap} style={{background: 'rgb(197, 186, 155)'}}/>
            <ShowProfile/>
            <RaisedButton onClick={this.profileOnClick} label="Edit Profile" labelColor="white" style={this.styles} backgroundColor="rgb(197, 186, 155)" />
            <RaisedButton onClick={this.logoutOnClick} label="Log Out" labelColor="white" style={this.styles} backgroundColor="rgb(171, 94, 94)"/>
            {this.state.renderProfile ? <ProfileUpdate/> : null}
          </Drawer>
      </div>
      </MuiThemeProvider>
    )
  }
}
