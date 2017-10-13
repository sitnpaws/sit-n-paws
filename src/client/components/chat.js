import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './chat.css';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: '',
      myName: '', myRole: '', myId: '',
      otherName: '', otherRole: '', otherId: '',
      messageText: '',
    };
  }

  componentWillMount() {
    this.token = localStorage.jwt;
    this.getChatInfo();
  }

  getChatInfo() {
    axios.get('/api/chat/'+this.props.stayId, {headers: {'authorization': this.token}})
      .then(resp => {
        this.setState({
          chatId: resp.data.chatId,
          myName: resp.data.user.name, myRole: resp.data.user.role, myId: resp.data.user.id,
          otherName: resp.data.other.name, otherRole: resp.data.other.role, otherId: resp.data.other.id,
        });
      });
  }

  render() {
    return (
      <div className="chat-window">
        <div className="chat-container">
          <div className="chat-header">
            <span>Chat with {this.state.otherName}</span>
          </div>
          <div className="messages-container">
            <span>Here's where the magic happens...</span>
          </div>
          <div className="new-message-container">
            <TextField className="new-message-field" id={`msgtextfield${this.state.chatId}`} multiLine={true} rows={1} rowsMax={3}
              hintText={`Send your ${this.state.otherRole} a message`} value={this.state.messageText} onChange={e => this.setState({messageText: e.target.value})} />
            <RaisedButton className="new-message-button" primary label="Send" />
          </div>
        </div>
      </div>
    );
  }
}
