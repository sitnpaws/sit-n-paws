import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {greenA700, red500, amber600, grey500, blueGrey200} from 'material-ui/styles/colors';
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
      statusColor: blueGrey200,
      name: null,
      avgRating: null,
      rating: 0,
      listingRating: this.props.stay.listingRating,
      guestRating: this.props.stay.guestRating
    }

    this.iconStyles = {
      marginRight: '5px',
      width: '42px',
      height: '42px',
      verticalAlign: 'middle'
    };

    this.starStyle = {
      width: '20px',
      height: '20px',
      verticalAlign: 'middle'
    }

    this.cardStyles = {
      'maxWidth':'70%',
      'textAlign':'left',
    };

    this.handleCancelStay = this.handleCancelStay.bind(this);
    this.handleGuestAccept = this.handleGuestAccept.bind(this);
    this.handleGuestReject = this.handleGuestReject.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleSubmitRating = this.handleSubmitRating.bind(this);
  }

  componentWillMount() {
    this.token = localStorage.jwt;
    this.getNameAndRating();
  }

  componentDidMount() {
    this.setStatusColor();
  }

  setStatusColor() {
    const statusColors = {
      pending: amber600,
      approved: greenA700,
      rejected: red500,
      cancelled: red500,
      expired: grey500,
      complete: grey500
    };

    this.setState({
      statusColor: statusColors[this.state.status]
    });
  }

  handleCancelStay() {
    axios.put('/api/stay/cancel/' + this.props.stay._id, null, {
      headers: {'authorization': this.token}
    }).then((res) => {
      this.setState({
        status: 'cancelled',
        statusColor: red500
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
        status: 'approved',
        statusColor: greenA700
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
        status: 'rejected',
        statusColor: red500
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
    const role = this.props.stay.role === 'guest' ? 'host' : 'guest';
    const params = {
      role: role,
      userId: userId
    };
    axios.get('/api/stay/rating/' + role + '/' + userId, {
      headers: {'authorization': this.token}
    }).then((res) => {
      const name = res.data.name.split(' ')
      this.setState({
        name: res.data.name,
        firstName: name[0],
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
              title={<span className="stay-title"><strong>Stay with {this.state.name} at {stay.listing.name}</strong></span>}
              subtitle={<span>Average Rating: {this.state.avgRating} Stars</span>}
              avatar={<Home style={this.iconStyles} color={this.state.statusColor}/>}
            >

            </CardHeader>
            <CardText>
              <div className="stay-detail">
                <div className="stay-date"><strong>Date: </strong>From <strong>{moment(stay.startDate).format('MM/DD/YYYY')}</strong> to <strong> {moment(stay.endDate).format('MM/DD/YYYY')}</strong></div>
                <div><strong>Status: </strong> <span className="stay-status">{this.state.status}</span></div>
                <div><strong>Price: </strong> ${stay.pricePer} Per Night</div>
                <div className="stay-total"><strong>Total: </strong> ${stay.totalPrice}</div>
              </div>
            </CardText>
            <CardActions>
              {
                this.state.status === 'complete'
                  ? (this.state.listingRating)
                    ? <div className="stay-rating">You have rated {stay.listing.name}: {this.state.listingRating} out of 5 Stars</div>
                    : <div className="stay-rating">
                      <span style={{verticalAlign:'-20px', lineHeight:'20px', marginRight:'5px'}}><SelectField
                        value={this.state.rating}
                        floatingLabelText="Rate Your Stay"
                        onChange={this.handleChangeRating}>
                        <MenuItem value={0} primaryText="Rating" />
                        <MenuItem value={5} primaryText="5/5 Perfect!" />
                        <MenuItem value={4} primaryText="4/5 Great!" />
                        <MenuItem value={3} primaryText="3/5 Good!" />
                        <MenuItem value={2} primaryText="2/5 Meh..." />
                        <MenuItem value={1} primaryText="1/5 Horrible!" />
                      </SelectField></span>
                      <RaisedButton label="Submit Rating" onClick={this.handleSubmitRating}/>
                    </div>
                  : this.state.status === 'cancelled' || this.state.status === 'rejected' || this.state.status === 'expired'
                    ? null
                    : <span><a href={`/chat/${stay._id}`}><FlatButton label={`chat with ${this.state.firstName}`} /></a><FlatButton label="Cancel Stay" secondary={true} onClick={this.handleCancelStay}/></span>
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
              title={<span className="stay-title"><strong>Request from {this.state.name} for {stay.listing.name}</strong></span>}
              subtitle={<span>Average Rating: {this.state.avgRating} Stars</span>}
              avatar={<Pets style={this.iconStyles} color={this.state.statusColor}/>}
            >

            </CardHeader>
            <CardText>
              <div className="stay-detail">
                <div className="stay-date"><strong>Date: </strong>From <strong>{moment(stay.startDate).calendar()}</strong> to <strong> {moment(stay.endDate).calendar()}</strong></div>
                <div><strong>Status: </strong> <span className="stay-status">{this.state.status}</span></div>
                <div><strong>Price: </strong> ${stay.pricePer} Per Night</div>
                <div className="stay-total"><strong>Total: </strong> ${stay.totalPrice}</div>
              </div>
            </CardText>
            <CardActions>
              {
                this.state.status === 'complete'
                  ? (this.state.guestRating)
                    ? <div className="stay-rating">You have rated {this.state.firstName}: {this.state.listingRating} out of 5 Stars</div>
                    : <div className="stay-rating">
                      <span style={{verticalAlign:'-20px', lineHeight:'20px', marginRight:'5px'}}><SelectField
                        value={this.state.rating}
                        floatingLabelText="Rate Your Guest"
                        onChange={this.handleChangeRating}>
                        <MenuItem value={0} primaryText="Rating" />
                        <MenuItem value={5} primaryText="5/5 Perfect!" />
                        <MenuItem value={4} primaryText="4/5 Great!" />
                        <MenuItem value={3} primaryText="3/5 Good!" />
                        <MenuItem value={2} primaryText="2/5 Meh..." />
                        <MenuItem value={1} primaryText="1/5 Horrible!" />
                      </SelectField></span>
                      <RaisedButton label="Submit Rating" onClick={this.handleSubmitRating}/>
                    </div>
                  : this.state.status === 'rejected' || this.state.status === 'cancelled' || this.state.status === 'expired'
                    ? null
                    : this.state.status === 'approved'
                      ? <span><a href={`/chat/${stay._id}`}><FlatButton label={`chat with ${this.state.firstName}`}/></a></span>
                      : <span><a href={`/chat/${stay._id}`}><FlatButton label={`chat with ${this.state.firstName}`}/></a>
                        <FlatButton label="Accept Guest" primary={true} onClick={this.handleGuestAccept}/>
                        <FlatButton label="Reject Guest" secondary={true} onClick={this.handleGuestReject}/></span>

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
