// libraries
import React from 'react';
import axios from 'axios';

// material-ui components
import RaisedButton from 'material-ui/RaisedButton';

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', phone: '', address: '' };
    this.setField = this.setField.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() { this.getProfile(); }

  // Handles form fields
  setField(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  getProfile() {
    axios.get('/api/profile', { headers: {'authorization': this.props.getToken()} })
      .then((res) => {
        this.setState({
          name: res.data.name,
          phone: res.data.phone,
          address: res.data.address
        });
      }).catch((err) => console.log(err));
  }

  // Updates profile on clicking submit button
  updateProfile() {
    let name = (this.state.name) ? this.state.name : '';
    let phone = (this.state.phone) ? this.state.phone : '';
    let address = (this.state.address) ? this.state.address : '';
    let data = {
      name: name,
      phone: phone,
      address: address
    };

    this.props.handleUpdateProfile(data);
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
