import React, { Component } from 'react';
import './chat.css';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    console.log('stayid is: ', props.stayId);
  }

  render() {
    return (
      <div className="chat-window">
        <div className="chat-container">
          <div className="chat-header">
            <span>Chat with Chris</span>
          </div>
          <div className="messages-container">
            <span>Here's where the magic happens...</span>
          </div>
          <div className="new-message-container">
            <span>New messages are born here!</span>
          </div>
        </div>
      </div>
    );
  }
}
