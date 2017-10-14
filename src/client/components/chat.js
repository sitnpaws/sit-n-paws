import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
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
      isTyping: false,
      otherTyping: false,
      atBeginningOfChat: false,
    };
    this.postMessage = this.postMessage.bind(this);
    this.debStopTyping = _.debounce(this.stopTyping.bind(this), 1500, true);
  }

  componentWillMount() {
    this.token = localStorage.jwt;
    this.getChatInfo();
  }

  componentDidMount() {
    this.socket = openSocket('/');
    this.socket.emit('enter chat', this.props.stayId);
    this.socket.on('refresh', () => this.getNewMessages());
    this.socket.on('started typing', () => {
      this.setState({otherTyping: true});
    });
    this.socket.on('stopped typing', () => {
      this.setState({otherTyping: false});
    });
  }

  componentWillUpdate() {
    this.isScrolledToBottom = this.messagesContainer.scrollTop + this.messagesContainer.offsetHeight === this.messagesContainer.scrollHeight;
    this.oldScrollHeight = this.messagesContainer.scrollHeight;
  }

  componentDidUpdate() {
    if (this.isScrolledToBottom) { // if at bottom, stay at bottom as new msgs come in
      this.scrollToBottom();
    } else { // else stay where you are
      this.messagesContainer.scrollTop = this.messagesContainer.scrollTop + (this.messagesContainer.scrollHeight - this.oldScrollHeight);
    }
  }

  scrollToBottom () { this.msgContainerBottom.scrollIntoView(); }

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
      .then(resp => {
        let messages = resp.data;
        messages.reverse();
        this.setState({messages}, () => {
          this.scrollToBottom();
          if (this.messagesContainer.scrollTop === 0) { this.getMessageHistory(); }
        });
      });
  }

  getMessageHistory() {
    axios.get('/api/messages/'+this.props.stayId, {
      headers: {'authorization': this.token},
      params: { before: this.state.messages[0].createdAt }
    }).then(resp => {
      let olderMessages = resp.data;
      olderMessages.reverse();
      this.setState({
        messages: olderMessages.concat(this.state.messages),
        atBeginningOfChat: (olderMessages.length < 20),
      });
    });
  }

  getNewMessages() {
    axios.get('/api/messages/'+this.props.stayId, {
      headers: {'authorization': this.token},
      params: { after: this.state.messages[this.state.messages.length - 1].createdAt }
    }).then(resp => {
      let newMessages = resp.data;
      newMessages.reverse();
      this.setState({messages: this.state.messages.concat(newMessages)});
    });
  }

  handleMessageKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.stopPropagation();
      this.postMessage();
    } else {
      this.handleTyping();
    }
  }

  handleTyping() {
    if (!this.state.isTyping) {
      this.startTyping();
    } else {
      this.debStopTyping(); // debounced so we can call it alot and be fine
    }
  }

  handleScroll(e) {
    if (e.target.scrollTop === 0 && !this.state.atBeginningOfChat) {
      this.getMessageHistory();
    }
  }

  startTyping() {
    this.socket.emit('started typing', this.props.stayId);
    this.setState({isTyping: true});
  }

  stopTyping() {
    this.socket.emit('stopped typing', this.props.stayId);
    this.setState({isTyping: false});
  }

  postMessage() {
    if (!this.state.messageText) { return; }
    axios.post('/api/messages/'+this.props.stayId,
    {text: this.state.messageText},
    {headers: {'authorization': this.token}}).then(resp => {
      this.setState({messageText: ''});
      this.socket.emit('new message', this.props.stayId);
      this.stopTyping();
    }).catch(err => console.log('Error: ', err));
  }

  render() {
    return (
      <div className="chat-window">
        <div className="chat-container">
          <div className="chat-header">
            {this.state.myRole &&
              <span>
                Chat with {this.state.otherName} about
                {`${this.state.myRole === 'guest' ? ' your ' : ' their '}`}
                pet's stay with {this.state.listingName}
              </span>}
          </div>
          <div ref={el => { this.messagesContainer = el}} className="messages-container" onScroll={e => this.handleScroll(e)}>
            {this.state.messages.map((msg, i) => (
              <MessageEntry
                key={`msg${i}`} message={msg}
                role={msg.user._id === this.state.myId ? this.state.myRole : this.state.otherRole}
                me = {msg.user._id === this.state.myId}
              />
            ))}
            <div ref={el => { this.msgContainerBottom = el; }}></div>
          </div>
          <div className="message-status-container">
            <span>{this.state.otherTyping ? this.state.otherName + ' is typing...' : ''}</span>
          </div>
          <div className="new-message-container">
            <TextField className="new-message-field" id={`msgtextfield${this.state.chatId}`}
              multiLine={true} rows={1} rowsMax={3}
              hintText={`Send your ${this.state.otherRole} a message`}
              value={this.state.messageText} onKeyDown={e => this.handleMessageKey(e)}
              onChange={e => this.setState({messageText: e.target.value})}
            />
            <div className="new-message-submit"><i className="material-icons">send</i></div>
          </div>
        </div>
      </div>
    );
  }
}

const MessageEntry = ({message, role, me}) => {
  const icon = role === 'guest' ? 'pets' : 'home';
  return (
    <div className={'message-entry-container ' + (me ? 'my-message' : 'other-message')}>
      <div className="message-header">
        <i className="material-icons">{icon}</i>
        <span className="message-time">{moment(message.createdAt).format('LT')}</span>
      </div>
      <div className="message-bubble">
        <span>{message.text}</span>
      </div>
    </div>
)}
