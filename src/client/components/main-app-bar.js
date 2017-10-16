// libraries
import React from 'react';
import { Link } from 'react-router-dom';

// styles
import './main-app-bar.css';

export default class MainAppBar extends React.Component {
  render() {
    return (
      <div className="main-app-bar-wrapper">
        <div className="main-app-bar-left-group">
          <div className="main-app-bar-icon"><i className="material-icons">pets</i></div>
          <div className="main-app-bar-title"><span>Sit-N-Paws</span></div>
        </div>
        <div className="main-app-bar-nav-group">
          <div className="main-app-bar-link-div"><Link to="/listings">Listings</Link></div>
          <div className="main-app-bar-link-div"><Link to="/stays">Stays</Link></div>
        </div>
        <div className="main-app-bar-right-group" onClick={this.props.toggleDrawer}>
          <div className="main-app-bar-icon">
            <i className="material-icons">menu</i>
          </div>
        </div>
      </div>
    );
  }
}
