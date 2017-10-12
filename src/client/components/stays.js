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
      stays: []
    };
  }

  componentWillMount() {
    this.token = localStorage.jwt;
  }

  componentDidMount() {
    this.getStays();
  }

  getStays() {
    axios.get('/api/stays', { headers: {'Authorization': this.token} })
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
    if (this.state.stays.length === 0) {
      return (
        <div>
          You have no stays yet! Woof!
        </div>
      )
    } else {
      return (
        this.state.stays.map(stay => <StayEntry stay={stay} key={stay._id}/>)
      )
    }
  }
}


export default Stays;
