import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import './listingView.css';

// This is the component for each individual listing.
// It has its own state to manage the email information
// of each individual listing.
export default class ListingView extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      name: null,
      avgRating: null,
      open: false,
      startDate: null,
      endDate: null,
      formWarning: '',
      focusedInput: null,
    }

    // Opens the modal upon clicking contact me
    this.handleOpen = () => {
      this.setState({open: true});
    }

    // Closes the modal upon clicking contact me
    this.handleClose = () => {
      this.setState({open: false, formWarning: ''});
    }

    this.handleRequestStay = () => {
      if (!this.state.startDate || !this.state.endDate) {
        this.setState({formWarning: 'Please fill in both dates.'});
        return;
      }
      axios.post('/api/stays',
        { // stay request data
          listingId: this.props.listing._id,
          startDate: this.state.startDate.toISOString(),
          endDate: this.state.endDate.toISOString()
        }, // params object: headers
        { headers: {'Authorization': this.token} }
      ).then(resp => {
        this.setState({open: false});
      }).catch(err => this.setState({formWarning: 'Server error: ' + err}));
    }

    this.getNameAndRating = () => {
      axios.get('/api/stay/rating/guest/' + this.props.listing.userId, {
        headers: {'authorization': this.token}
      }).then((res) => {
        this.setState({
          name: res.data.name,
          avgRating: res.data.rating
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  componentDidMount() {
    this.token = localStorage.jwt;
    this.getNameAndRating();
  }

  render() {
    // These are the action buttons for the Dialog
    const actions = [
      <RaisedButton
        className="modal-button"
        label="Cancel"
        secondary
        onClick={this.handleClose}
      />,
      <RaisedButton
        className="modal-button"
        label="Request Stay"
        primary
        onClick={this.handleRequestStay}
      />
    ];

    // Refer to material-ui cards for more info on changing card styles
    // Each props.listing is passed from Main to listingsContainer to listingView
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.listing.name}
            subtitle={"Puppy Lover in: " + this.props.listing.zipcode}
            avatar={this.props.listing.hostPictures}
          />
          <CardMedia
            overlay={<CardTitle title={`$${this.props.listing.cost} Per Night!`} subtitle={this.props.listing.homeAttributes} />}
          >
            <img src={this.props.listing.homePictures} alt="Home Picture" width="360" height="270" />
          </CardMedia>
          <CardTitle title={`${this.state.avgRating} Stars`}
            subtitle={`Max Dog Size:${this.props.listing.dogSizePreference}`} />
          <CardText>
            <div className = "listing">
              {`Preferred Dog Breed: ${this.props.listing.dogBreedPreference}. `}
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Request a stay" onClick={this.handleOpen}/>
            <Dialog
              title= {`Request a stay with ${this.props.listing.name}`}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              bodyClassName="date-picker-dialog-body"
            >
              <div className="booking-form-container">
                <div className="booking-form-row">
                  <div className="booking-form-subtitle"><span>What dates are you thinking?</span></div>
                  <DateRangePicker
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                  />
                </div>
              </div>
              {this.state.formWarning &&
                <div className="modal-warning">
                  <span>{this.state.formWarning}</span>
                </div>
              }
            </Dialog>
        </CardActions>
        </Card>
      </div>
    )
  }
}
