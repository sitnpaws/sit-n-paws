import React from 'react';
import axios from 'axios';
import StayEntry from './stayEntry.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Pets from 'material-ui/svg-icons/action/pets';
import RaisedButton from 'material-ui/RaisedButton';
import jwt from 'jsonwebtoken';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

class Stays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      stays: [
        {
          "_id": "1",
          "listingId": "1111",
          "guestId": "111",
          "hostId": '1234',
          "hostEmail": 'j@j.com',
          "startDate": "2016-05-18T16:00:00Z",
          "endDate": "2016-05-18T16:00:00Z",
          "status": "pending",
          "hostRating": "",
          "guestRating": "",
          "pricePer": "25",
          "totalPrice": "25"
        },
        {
          "_id": "2",
          "listingId": "2222",
          "hostId": "1111",
          "guestId": "55111",
          "hostEmail": 'a@a.com',
          "startDate": "2016-05-18T16:00:00Z",
          "endDate": "2016-05-18T16:00:00Z",
          "status": "closed",
          "hostRating": "",
          "guestRating": "",
          "pricePer": "55",
          "totalPrice": "55"
        },
        {
          "_id": "3",
          "listingId": "2222",
          "guestId": "1121",
          "hostId": "1111",
          "hostEmail": 'j@j.com',
          "startDate": "2016-05-18T16:00:00Z",
          "endDate": "2016-05-18T16:00:00Z",
          "status": "closed",
          "hostRating": "",
          "guestRating": "",
          "pricePer": "55",
          "totalPrice": "55"
        },
        {
          "_id": "4",
          "listingId": "3333",
          "guestId": "111",
          "hostId": "1111",
          "startDate": "2016-05-18T16:00:00Z",
          "endDate": "2016-05-18T16:00:00Z",
          "status": "pending",
          "hostRating": "",
          "guestRating": "",
          "pricePer": "74",
          "totalPrice": "74"
        },
        {
          "_id": "5",
          "listingId": "2222",
          "hostId": "1111",
          "guestId": "12345",
          "hostEmail": 'j@j.com',
          "startDate": "2016-05-18T16:00:00Z",
          "endDate": "2016-05-18T16:00:00Z",
          "status": "confirmed",
          "hostRating": "",
          "guestRating": "",
          "pricePer": "55",
          "totalPrice": "55"
        },
        {
          "_id": "6",
          "listingId": "3333",
          "guestId": "111",
          "hostId": "1111",
          "startDate": "2016-05-18T16:00:00Z",
          "endDate": "2016-05-18T16:00:00Z",
          "status": "cancelled",
          "hostRating": "",
          "guestRating": "",
          "pricePer": "74",
          "totalPrice": "74"
        },
      ]
    };
  }

  componentWillMount() {
    var token = localStorage.jwt;
    var decoded = jwt.decode(token);
    this.setState({email: decoded.email});
  }

  componentDidMount() {
    // uncomment when this is working
    // this.getStays();
  }

  getStays() {
    // api route should return all stays with the user's id as hostId OR guestId
    axios.get('/api/stays', localStorage.jwt)
      .then((res) => {
        this.setState({
          stays: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {
          (this.state.stays.length !== 0)
            ? this.state.stays.map(stay => <StayEntry stay={stay} key={stay._id}/>)
            : <div>You have no stays yet!</div>
        }
      </div>

    )
  }
}


export default Stays;
