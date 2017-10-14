import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Stays from './stays';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Star from 'material-ui/svg-icons/toggle/star';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Pets from 'material-ui/svg-icons/action/pets';
import Home from 'material-ui/svg-icons/action/home';
import jwt from 'jsonwebtoken';
import moment from 'moment';

class StayEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.stay.status,
      name: null,
      avgRating: null,
      rating: 0,
      listingRating: this.props.stay.listingRating,
      guestRating: this.props.stay.guestRating
    }

    this.iconStyles = {
      marginRight: 5,
      verticalAlign: 'middle'
    };

    this.cardStyles = {
      'maxWidth':'70%',
      'textAlign':'left'
    };

    this.handleCancelStay = this.handleCancelStay.bind(this);
    this.handleGuestAccept = this.handleGuestAccept.bind(this);
    this.handleGuestReject = this.handleGuestReject.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleSubmitRating = this.handleSubmitRating.bind(this);
  }

  componentWillMount() { this.token = localStorage.jwt; this.getNameAndRating(); }

  handleCancelStay() {
    axios.put('/api/stay/cancel/' + this.props.stay._id, null, {
      headers: {'authorization': this.token}
    }).then((res) => {
      this.setState({
        status: 'cancelled'
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleGuestAccept() {
    axios.put('/api/stay/approve/' + this.props.stay._id, null, {
      headers: {'authorization': this.token}
    }).then((res) => {
      this.setState({
        status: 'confirmed'
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleGuestReject() {
    axios.put('/api/stay/reject/' + this.props.stay._id, null, {
      headers: {'authorization': this.token}
    }).then((res) => {
      this.setState({
        status: 'rejected'
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleChangeRating(event, index, value) {
    this.setState({ rating: value });
  }

  handleSubmitRating() {
    if (this.state.rating > 0) {
      const params = {
        role: this.props.stay.role,
        rating: this.state.rating
      };
      axios.put('/api/stay/rating/' + this.props.stay._id, params, {
        headers: {'authorization': this.token}
      }).then((res) => {
        this.props.stay.role === 'guest'
        ? this.setState({ listingRating: this.state.rating })
        : this.setState({ guestRating: this.state.rating });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      console.log('pick a rating before submitting');
    }
  }

  getNameAndRating() {
    const userId = this.props.stay.role === 'guest' ? this.props.stay.hostId : this.props.stay.guestId;
    const role = this.props.stay.role;
    const params = {
      role: role,
      userId: userId
    };
    axios.get('/api/stay/rating/' + role + '/' + userId, {
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

  render() {
    const { stay } = this.props;

    if (stay.role === 'guest') {
      // Guest View
      return(
        <div className="stay-entry" align="center">
          <Card style={this.cardStyles}>
            <CardHeader
              title={<span className="stay-title"><strong>Stay with {this.state.name} at {stay.listing.name}</strong> (<Star style={{'verticalAlign': 'middle'}}/> {this.state.avgRating})</span>}
              subtitle={`Status: ${this.state.status}`}
              avatar={<Home style={this.iconStyles} />}
            >
              {
                (this.state.listingRating)
                  ? <div style={{'float':'right'}}>{this.state.listingRating} out of 5 stars</div>
                  : <div style={{'float':'right'}}>
                    <SelectField
                      value={this.state.rating}
                      floatingLabelText="Rate Your Stay"
                      onChange={this.handleChangeRating}>
                      <MenuItem value={0} primaryText="Rating" />
                      <MenuItem value={5} primaryText="5/5 Perfect!" />
                      <MenuItem value={4} primaryText="4/5 Great!" />
                      <MenuItem value={3} primaryText="3/5 Good!" />
                      <MenuItem value={2} primaryText="2/5 Meh..." />
                      <MenuItem value={1} primaryText="1/5 Horrible!" />
                    </SelectField>
                    <div align="right">
                      <RaisedButton label="Submit Rating" onClick={this.handleSubmitRating}/>
                    </div>
                  </div>
              }

            </CardHeader>
            <CardText>
              <div className = "stayDetail">
                <div>{`Date: ${moment(stay.startDate).calendar()} to ${moment(stay.endDate).calendar()}`}</div>
                <div>{`Price Per Night: $${stay.pricePer}`}</div>
                <div>{`Total: $${stay.totalPrice}`}</div>
              </div>
            </CardText>
            <CardActions>
              {
                this.state.status === 'complete'
                  ? <FlatButton label="Leave Review" secondary={true} onClick={this.handleReview}/>
                  : this.state.status === ('cancelled' || 'rejected')
                    ? null
                    : <span><a href={`/chat/${stay._id}`}><FlatButton label="Chat with Host" /></a><FlatButton label="Cancel Stay" secondary={true} onClick={this.handleCancelStay}/></span>
              }
            </CardActions>
          </Card>
        </div>
      )
    } else if (stay.role === 'host') {
      // Host View
      return(
        <div className="stay-entry" align="center">
          <Card style={this.cardStyles}>
            <CardHeader
              title={<span className="stay-title"><strong>Request from {this.state.name} at {stay.listing.name}</strong>(<Star style={{'verticalAlign': 'middle'}}/> {this.state.avgRating})</span>}
              subtitle={`Status: ${this.state.status}`}
              avatar={<Pets style={this.iconStyles} />}
            >
              {
                (this.state.guestRating)
                  ? <div style={{'float':'right'}}>{this.state.guestRating} out of 5 stars</div>
                  : <div style={{'float':'right'}}>
                    <SelectField
                      value={this.state.rating}
                      floatingLabelText="Rate Your Stay"
                      onChange={this.handleChangeRating}>
                      <MenuItem value={0} primaryText="Rating" />
                      <MenuItem value={5} primaryText="5/5 Perfect!" />
                      <MenuItem value={4} primaryText="4/5 Great!" />
                      <MenuItem value={3} primaryText="3/5 Good!" />
                      <MenuItem value={2} primaryText="2/5 Meh..." />
                      <MenuItem value={1} primaryText="1/5 Horrible!" />
                    </SelectField>
                    <div align="right">
                      <RaisedButton label="Submit Rating" onClick={this.handleSubmitRating}/>
                    </div>
                  </div>
              }
            </CardHeader>

            <CardText>
              <div className = "stayDetail">
                <div>{`Date: ${moment(stay.startDate).calendar()} to ${moment(stay.endDate).calendar()}`}</div>
                <div>{`Price Per Night: $${stay.pricePer}`}</div>
                <div>{`Total: $${stay.totalPrice}`}</div>
              </div>
            </CardText>
            <CardActions>
              {
                  this.state.status === 'pending'
                    ? <span><a href={`/chat/${stay._id}`}><FlatButton label="Chat with Guest" /></a><FlatButton label="Accept Guest" primary={true} onClick={this.handleGuestAccept}/>
                      <FlatButton label="Reject Guest" secondary={true} onClick={this.handleGuestReject}/></span>
                    : this.state.status === ('complete' || 'cancelled') ? <FlatButton label="Leave Review" secondary={true} onClick={this.handleReview}/> : null
              }
            </CardActions>
          </Card>
        </div>
        )
      } else {
        return (
          <div></div>
        )
      }
    }
  }

  export default StayEntry;
