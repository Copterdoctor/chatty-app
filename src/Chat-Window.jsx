import React, { Component } from 'react';
import Footer from './Footer.jsx';
import { generateRandomId } from './helpers/RandomNumber';


const messages = [
  {
    id: "Welcome1",
    type: "incomingMessage",
    content: "WELCOME TO CHATTY APP",
    username: "CHATTY APP"
  },
  {
    id: "Notification1",
    type: "incomingNotification",
    content: "Anonymous1 changed their name to nomnom",
  },
]
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
    this.socket = new WebSocket(`ws://localhost:3001/`);
    this.newMessage = this.newMessage.bind(this);
    this.receivedNewMessage = this.receivedNewMessage.bind(this);
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
      username: message.username
    };

    this.socket.send(JSON.stringify(newMessageObj));
  }

  receivedNewMessage(message) {
    const newMessage = JSON.parse(message);
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    this.setState({ messages: newMessages });
  }

  render() {
    const chatMessages = this.state.messages.map((message) => {
      return (
        <div className={message.type} key={message.id}>
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      )
    })
    return (
      <main className="messages">
        {chatMessages}
        <Footer newMessage={this.newMessage} />
      </main>
    )
  }
}

export default ChatWindow;


// Cut from boilerplate code
//   < div class="message system" >
//     Anonymous1 changed their name to nomnom.
//         </div >