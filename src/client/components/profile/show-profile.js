// libraries
import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// material-ui components
import Avatar from 'material-ui/Avatar';

// app modules / components
import ProfileForm from './profile-form.js';

// Shows the profile in the drawer
export default class ShowProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null }
    this.styles = { width: 140, height: 140 }

    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.getName = this.getName.bind(this);
  }

  componentDidMount() { this.getName(); }

  getName() {
    this.setState({ name: jwt.decode(this.props.getToken()).name });
  }

  handleUpdateProfile(data) {
    axios.put('/api/profile', data, { headers: {'Authorization': this.props.getToken()} })
      .then((res) => {
        this.props.onLogin(res.data.token);
        this.getName();
      }).catch((err) => console.log(err));
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
            (this.props.editProfile) ? <ProfileForm getToken={this.props.getToken} handleUpdateProfile={this.handleUpdateProfile} /> : null
          }
        </div>
      </div>
    );
  };
}
