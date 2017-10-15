import React from 'react';
import ListingsContainer from './listingsContainer.js';
import PostListing from './PostListing.js';
import ProfileUpdate from './profileForm.js';
import ShowProfile from './showProfile.js';
import Search from './search.js'
import request from 'superagent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import { AppBar, Tabs, Tab } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Pets from 'material-ui/svg-icons/action/pets';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

// styles
const styles = {
  appBar: {
    background: '#C5BA9B',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0
  },
  tabItemContainer: { background: 'none', maxWidth: '600px' },
  tab: { backgroundColor: '#C5BA9B', height: '40px', marginTop: '25px', marginBottom: 0 },
  title: { background: '#C5BA9B', height: 'auto', lineHeight: 'auto' }
}

export default class MainAppBar extends React.Component {
  render() {
    return (
      <AppBar
        title={
          <Tabs tabItemContainerStyle={styles.tabItemContainer} inkBarStyle={{background: 'none'}}>
            <Tab label="Main" value="main" style={styles.tab} href="/main"/>
            <Tab label="Stays" value="stays" style={styles.tab} href="/stays"/>
          </Tabs>
        }
        iconElementLeft={<IconButton><Pets/></IconButton>}
        iconElementRight={<IconButton><NavigationMenu/></IconButton>}
        onRightIconButtonTouchTap={this.touchTap} style={styles.appBar}
      >
      </AppBar>
    )
  }
}
