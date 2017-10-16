// libraries
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// material-ui components
import FlatButton from 'material-ui/FlatButton';

export default class PostListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      zipcode: '',
      dogSizePreference: '',
      dogBreedPreference: '',
      dogActivityPreference: '',
      hostPictures: null,
      homePictures: null,
      cost: '',
      submitted: false,
      error: null,
      message: 'Thank you, your listing has been successfully submitted!'
    }

    //handles input fields
    this.setField = (e) => {
      if (e.target.type === 'file') {
        this.setState({[e.target.name]: e.target.files[0]});
      } else {
        this.setState({[e.target.name]: e.target.value});
      }
    }

    this.handleSubmit = () => {
      for (let key in this.state) {
        if (this.state[key] === '') {
          console.log('Form Error ', key);
          this.setState({error: `The following field is required: ${key}`});
          return;
        }
      }
      let formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("email", this.state.email);
      formData.append("zipcode", this.state.zipcode);
      formData.append("dogSizePreference", this.state.dogSizePreference);
      formData.append("dogBreedPreference", this.state.dogBreedPreference);
      formData.append("dogActivityPreference", this.state.dogActivityPreference);
      formData.append("hostPictures", this.state.hostPictures);
      formData.append("homePictures", this.state.homePictures);
      formData.append("cost", this.state.cost);

      axios.post('/api/listings', formData, {headers: {'authorization': this.props.getToken()}})
        .then(resp => {
          if (resp.data.success === true) {
            this.setState({message: resp.data.message, submitted: true});
          }
        }).catch(err => console.log('error: ', err));
    }
  }
  
  render() {
    if (this.state.submitted === true) {
      return (
        <h1> {this.state.message} </h1>
      )
    } else {
      return (
        <div>
          {this.state.error ? <p className="postListing-error">{this.state.error}</p> : ''}
          <form onChange={this.setField} onSubmit={this.handleSubmit}>
            <div className="postListing">
              <div className="postListing-label">

                <label>Property Name:</label><br />
                <input type="text" name="name" value={this.state.name} /><br />

                <label>Email:</label><br />
                <input type="text" name="email" value={this.state.email} /><br />

                <label>Zip Code:</label><br />
                <input type="number" name="zipcode" value={this.state.zipcode} /><br />

                <label>Dog Size Preference</label><br />
                <input type="text" name="dogSizePreference" value={this.state.dogSizePreference} /><br />

                <label>Dog Breed Preference:</label><br />
                <input type="text" name="dogBreedPreference" value={this.state.dogBreedPreference} /><br />
              </div>
              <div className="postListing-label">
                <label>Dog Activity Preferences:</label><br />
                <input type="text" name="dogActivityPreference" value={this.state.dogActivityPreference} /><br />

                <label>Cost Per Night: </label><br />
                <input type="text" name="cost" value={this.state.cost} /><br />

                <label>Description:</label><br />
                <textarea type="text" name="homeAttributes" value={this.state.homeAttributes} /><br />

                <label htmlFor="hostPictures" className="postListing-fileLabel">{this.state.hostPictures ? this.state.hostPictures.name : `Choose a Picture of you`}</label><br />
                <input type="file" name="hostPictures" id="hostPictures" className="postListing-file" /><br />

                <label htmlFor="homePictures" className="postListing-fileLabel">{this.state.homePictures ? this.state.homePictures.name : `Choose a Picture of your home`}</label><br />
                <input type="file" name="homePictures" id="homePictures" className="postListing-file" /><br />
              </div>
            </div>
            <div >
              <FlatButton
              className="postListing-submit"
              label="Submit"
              primary={true}
              onClick={() => {
                this.handleSubmit();
              }}
              />
            </div>
          </form>
        </div>
      );
    };
  };
}
