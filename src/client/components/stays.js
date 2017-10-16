// libraries
import React from 'react';
import axios from 'axios';

// app components / modules
import StayEntry from './stayEntry.js';

export default class Stays extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stays: [] };
  }

  componentDidMount() { this.getStays(); }

  getStays() {
    axios.get('/api/stays', { headers: {'Authorization': this.props.getToken()}})
      .then((res) => {
        this.setState({ stays: res.data });
      }).catch((err) => console.log(err));
  }

  render() {
    if (this.state.stays.length === 0) {
      return <div>You have no stays yet! Woof!</div>;
    } else {
      return (this.state.stays.map(stay => <StayEntry stay={stay} key={stay._id} getToken={this.props.getToken}/>));
    }
  }
}
