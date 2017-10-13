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

// This component is the upper level component for all other components.
export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      query: '',
      openDrawer: false,
      openPostListing: false,
      renderProfile: false,
      tabVal: 'main'
    }

    // Drawer - Opens the side drawer for my profile
    this.touchTap = () => {
      this.setState({openDrawer: !this.state.openDrawer});
    }

    // Drawer - Styles for the side drawer buttons
    this.styles = {
      margin: 40,
      appBar: {
        background: '#C5BA9B',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
      },
      tabItemContainer: {
		    background: 'none',
        maxWidth: '600px',
	    },
      tab: {
        backgroundColor: '#C5BA9B',
        height: '40px',
        marginTop: '25px',
        marginBottom: 0
      },
      title: {
        background: '#C5BA9B',
        height: 'auto',
        lineHeight: 'auto',
      }
    }

    // Drawer - Handles logout by removing jwt token and refreshing the page
    this.logoutOnClick = (event) => {
      localStorage.removeItem('jwt');
      window.location.reload();
    }

    // Drawer - Renders Edit Your Profile when Edit Profile button is clicked
    this.profileOnClick = (event) => {
      this.setState({renderProfile: !this.state.renderProfile});
    }

    // PostListing - Opens modal to post a listing
    this.postListing = () => {
      this.setState({openPostListing: !this.state.openPostListing});
    }

    // Search - live search by zipcode
    this.handleSearch = (term) => {
      const url = `/listings/${term}`;
      request.get(url, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ listings:res.body });
        }
      });
    }
  }

  // Populates listings on load
  componentDidMount() {
    this.handleSearch('');
  }

  // Renders AppBar, Search, Drawer, and PostListing
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <AppBar
              title={<Tabs value={this.state.tabVal} tabItemContainerStyle={this.styles.tabItemContainer} inkBarStyle={{background: 'none'}}>
                <Tab label="Main" value="main" style={this.styles.tab} href="/main"/>
                <Tab label="Stays" value="stays" style={this.styles.tab} href="/stays"/>
              </Tabs>}
              iconElementLeft={<IconButton><Pets/></IconButton>}
              iconElementRight={<IconButton><NavigationMenu/></IconButton>}
              onRightIconButtonTouchTap={this.touchTap}
              // onLeftIconButtonTouchTap={this.postListing}
              style={this.styles.appBar}
            >

            </AppBar>
          </div>
          <br/>
          <div className="search">
            <Search onChange={this.handleSearch}/>
          </div>
          <br/>
          <ListingsContainer listings={this.state.listings} />
          <Drawer width={400} openSecondary={true} open={this.state.openDrawer} >
            <AppBar title="Sit-n-Paws Profile" onLeftIconButtonTouchTap={this.touchTap} style={{background: '#C5BA9B'}}/>
            <ShowProfile editProfile={this.state.renderProfile}/>
            <RaisedButton onClick={this.profileOnClick} label="Edit Profile" labelColor="#FFFFFF" style={this.styles} backgroundColor="#C5BA9B" />
            <RaisedButton onClick={this.logoutOnClick} label="Log Out" labelColor="#FFFFFF" style={this.styles} backgroundColor="#AB5E5E"/>
            <div align="center">
              <RaisedButton style={{'marginTop':'25px'}} onClick={this.postListing} label="Become a Host!" labelColor="#000000"/>
            </div>
          </Drawer>
          <Dialog
            modal={false}
            open={this.state.openPostListing}
            onRequestClose={this.postListing}
          >
            <PostListing />
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
