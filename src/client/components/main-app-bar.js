// libraries
import React from 'react';

// material ui components
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Pets from 'material-ui/svg-icons/action/pets';

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
            <Tab label="Listings" value="listings" style={styles.tab} href="/listings"/>
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
