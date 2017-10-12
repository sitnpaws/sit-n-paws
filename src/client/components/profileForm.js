import React from 'react';
import axios from 'axios';
import ListingView from './listingView';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoginSubmit from '../utils/login';
import masterUrl from '../utils/masterUrl.js';
import jwt from 'jsonwebtoken'


export default class ProfileUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      address: ''
    }
    this.token;
    this.setField = this.setField.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    this.token = localStorage.jwt;
  }

  // Handles form fields
  setField(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  // Updates profile on clicking submit button
  updateProfile() {
    let name = (this.state.name) ? this.state.name : null;
    let phone = (this.state.phone) ? this.state.phone : null;
    let address = (this.state.address) ? this.state.address : null;
    let data = {
      name: name,
      phone: phone,
      address: address
    };
    console.log(data);
    axios.put('/api/profile', data, { headers: {'Authorization': this.token} })
      .then((res) => {
        console.log('profile updated: ', res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Form for updateProfile
  render() {
    return (
      <div className='profileBox'>
        <h1>Edit Your Profile</h1>
        <form onChange={this.setField}>
          <fieldset>
            <label>Name:</label>
            <input type="text" value={this.state.name} name="name" />
            <br />
            <label>Phone:</label>
            <input type="text" value={this.state.phone} name="phone" />
            <br />
            <label>Address:</label>
            <input type="text" value={this.state.address} name="address" />
          </fieldset>
        </form>
        <br />
        <RaisedButton onClick={this.updateProfile} type="submit" label="Submit Changes" primary={true} style={this.styles} />
      </div>
    )
  }
}
