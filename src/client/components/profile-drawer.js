// libraries
import React from 'react';

// material ui components
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

// app modules
import PostListing from './PostListing.js';
import ProfileUpdate from './profileForm.js';
import ShowProfile from './showProfile.js';

export default class ProfileDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPostListing: false,
      openEditProfile: false
    }
    // Drawer - Styles for the side drawer buttons
    this.styles = { margin: 40 }
    this.toggleEditProfile = this.toggleEditProfile.bind(this);
    this.togglePostListing = this.togglePostListing.bind(this);
  }

  toggleEditProfile(event) { this.setState({openEditProfile: !this.state.openEditProfile}); }
  togglePostListing() { this.setState({openPostListing: !this.state.openPostListing}); }

  render() {
    return (
      [
        (<Drawer key="prof-drawer" width={400} openSecondary={true} open={this.props.drawerOpen} >
          <AppBar title="Sit-n-Paws Profile" onLeftIconButtonTouchTap={this.props.toggleDrawer} style={{background: '#C5BA9B'}}/>
          <ShowProfile getToken={this.props.getToken} editProfile={this.state.openEditProfile}/>
          <RaisedButton onClick={this.toggleEditProfile} label="Edit Profile" labelColor="#FFFFFF" style={this.styles} backgroundColor="#C5BA9B" />
          <RaisedButton onClick={this.props.onLogout} label="Log Out" labelColor="#FFFFFF" style={this.styles} backgroundColor="#AB5E5E"/>
          <div align="center">
            <RaisedButton style={{'marginTop':'25px'}} onClick={this.togglePostListing} label="Become a Host!" labelColor="#000000"/>
          </div>
        </Drawer>),
        (<Dialog key="post-listing-dialog" modal={false} open={this.state.openPostListing}
          onRequestClose={this.togglePostListing}>
          <PostListing />
        </Dialog>)
      ]
    );
  }
}
