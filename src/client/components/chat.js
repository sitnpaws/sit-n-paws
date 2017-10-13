import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import openSocket from 'socket.io-client';
import './chat.css';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: '',
      myName: '', myRole: '', myId: '',
      otherName: '', otherRole: '', otherId: '',
      listingName: '',
      messageText: '',
      messages: [],
    };
    this.postMessage = this.postMessage.bind(this);
  }

  componentWillMount() {
    this.token = localStorage.jwt;
    this.getChatInfo();
  }

  componentDidMount() {
    this.socket = openSocket('/');
    this.socket.emit('enter chat', this.props.stayId);
    this.socket.on('refresh', () => this.getMessages());
  }

  getChatInfo() {
    axios.get('/api/chat/'+this.props.stayId, {headers: {'authorization': this.token}})
      .then(resp => {
        this.setState({
          chatId: resp.data.chatId,
          myName: resp.data.user.name, myRole: resp.data.user.role, myId: resp.data.user.id,
          otherName: resp.data.other.name, otherRole: resp.data.other.role, otherId: resp.data.other.id,
          listingName: resp.data.stay.listing.name
        }, () => this.getMessages());
      });
  }

  getMessages() {
    axios.get('/api/messages/'+this.props.stayId, {headers: {'authorization': this.token}})
      .then(resp => this.setState({messages: resp.data}));
  }

  postMessage() {
    console.log('posting message: ', this.state.messageText);
    axios.post('/api/messages/'+this.props.stayId,
    {text: this.state.messageText},
    {headers: {'authorization': this.token}}).then(resp => {
      console.log('new message posted');
      this.setState({messageText: ''});
      this.socket.emit('new message', this.props.stayId);
    }).catch(err => console.log('Error: ', err));
  }

  render() {
    return (
      <div className="chat-window">
        <div className="chat-container">
          <div className="chat-header">
            {this.state.myRole === 'guest' &&
              <span>Chat with {this.state.otherName} about
                {`${this.state.myRole === 'guest' ? ' your ' : ' their '}`}
                pet's stay with {this.state.listingName}</span>}
          </div>
          <div className="messages-container">
            {this.state.messages.map((msg, i) => <MessageEntry key={`msg${i}`} message={msg} />)}
          </div>
          <div className="new-message-container">
            <TextField className="new-message-field" id={`msgtextfield${this.state.chatId}`} multiLine={true} rows={1} rowsMax={3}
              hintText={`Send your ${this.state.otherRole} a message`} value={this.state.messageText} onChange={e => this.setState({messageText: e.target.value})} />
            <RaisedButton className="new-message-button" primary label="Send" onClick={()=>this.postMessage()} />
          </div>
        </div>
      </div>
    );
  }
}

const MessageEntry = ({message}) => (
  <div className="message-entry-container">
    <div className="message-author"><span>{message.user.name}:</span></div>
    <div className="message-text"><span>{message.text}</span></div>
  </div>
)
