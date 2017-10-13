import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Stays from './stays';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
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
      status: this.props.stay.status
    }

    this.iconStyles = {
      marginRight: 5
    };

    this.cardStyles = {
      'maxWidth':'70%',
      'textAlign':'left'
    };

    this.handleCancelStay = this.handleCancelStay.bind(this);
    this.handleGuestAccept = this.handleGuestAccept.bind(this);
    this.handleGuestReject = this.handleGuestReject.bind(this);
  }

  componentWillMount() { this.token = localStorage.jwt; }

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

  handleReview() {
    // TODO: leave rating for host/guest
  }

  render() {
    const { stay } = this.props;

    if (stay.role === 'guest') {
      // Guest View
      return(
        <div className="stay-entry" align="center">
          <Card style={this.cardStyles}>
            <CardHeader
              title={<span className="stay-title"><strong>Stay with {stay.listing.name}</strong></span>}
              subtitle={`Status: ${this.state.status}`}
              avatar={<Home style={this.iconStyles} />}
            />
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
              title={<span className="stay-title"><strong>Request from A Guest!</strong></span>}
              subtitle={`Status: ${this.state.status}`}
              avatar={<Pets style={this.iconStyles} />}
            >
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
