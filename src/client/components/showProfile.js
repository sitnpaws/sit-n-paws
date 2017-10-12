import React from 'react';
import axios from 'axios';
import ListingView from './listingView';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import jwt from 'jsonwebtoken';
import ProfileUpdate from './profileForm.js';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

// Shows the profile in the drawer
export default class ShowProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: null
    }

    this.styles = {
      width: 140,
      height: 140
    }

    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.getName = this.getName.bind(this);

  }

  componentDidMount() {
    this.getName();
  }

  getName() {
    this.token = localStorage.jwt;
    let decoded = jwt.decode(this.token);
    this.setState({
      name: decoded.name
    });
  }

  handleUpdateProfile(data) {
    axios.put('/api/profile', data, { headers: {'Authorization': this.token} })
      .then((res) => {
        localStorage.setItem('jwt', res.data.token);
        this.getName();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className='profileBox'>
        <div className="profileName">
          <h1>{this.state.name}</h1>
        </div>
        <Avatar style={this.styles}
          backgroundColor='none'
          alt="User Picture"
          src="https://i.imgur.com/katTIZJ.png"
        />
        <div>
          {
            (this.props.editProfile) ? <ProfileUpdate handleUpdateProfile={this.handleUpdateProfile} /> : null
          }
        </div>
      </div>
    );
  };
}
