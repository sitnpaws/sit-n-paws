import React, { Component } from 'react';


export default class Chat extends Component {
  constructor(props) {
    super(props);
    console.log('stayid is: ', props.stayId);
  }

  render() {
    return (
      <div>Chat for: {this.props.stayId}</div>
    );
  }
}
