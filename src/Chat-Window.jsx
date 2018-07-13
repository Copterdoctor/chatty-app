import React, { Component } from 'react';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';


const messages = [
  {
    id: "Welcome1",
    type: "incomingMessage",
    content: "WELCOME TO CHATTY APP",
    username: "CHATTY APP"
  }
]
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userCount: 0,
      color: "black"
    }
    this.socket = new WebSocket(`ws://localhost:3001/`);
    this.newMessage = this.newMessage.bind(this);
    this.receivedNewMessage = this.receivedNewMessage.bind(this);
    this.chatMessageHandler = this.chatMessageHandler.bind(this);
    this.userCountHandler = this.userCountHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      messages: messages
    })

    this.socket.onopen = (evt) => {
      console.log('Connected to socket!');
    }

    this.socket.onmessage = (event) => {
      this.receivedNewMessage(event.data);
    }
  }

  newMessage(message) {

    const newMessageObj = {
      id: '',
      type: message.type,
      content: message.content,
      username: message.username,
      color: this.state.color
    };

    this.socket.send(JSON.stringify(newMessageObj));
  }

  receivedNewMessage(data) {
    const newData = JSON.parse(data);
    console.log(newData);

    switch (newData.type) {
      case "incomingMessage":
        this.chatMessageHandler(newData);
        break;
      case "incomingNotification":
        this.chatMessageHandler(newData);
        break;
      case "userCountUpdate":
        this.userCountHandler(newData);
        break;
      case "newConnection":
        this.setState({
          color: newData.color
        })
        break;
      case "image":
        this.chatMessageHandler(newData);
        break;
      default:
        console.log('Unable to determin type of received mesasage');
        break;
    }
  }

  chatMessageHandler(message) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({ messages: newMessages });
  }

  userCountHandler(message) {
    this.setState({
      userCount: message.count
    })
  }

  render() {
    const chatMessages = this.state.messages.map((message) => {
      return (
        <div className={message.type} key={message.id}>
          <span className="message-username" style={{ color: message.color }}>{message.username}</span>
          <span className="message-content">{message.content}</span>
          {message.url && <img style={{ "height": "25vh" }} src={message.url} alt={`Img url entered was ${message.url}`} />}
        </div>
      )
    })
    return (
      <main className="messages">
        <Navbar userCount={this.state.userCount} />
        {chatMessages}
        <Footer newMessage={this.newMessage} />
      </main>
    )
  }
}

export default ChatWindow;