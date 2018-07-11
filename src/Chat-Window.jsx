import React, { Component } from 'react';
import Footer from './Footer.jsx';
import { generateRandomId } from './helpers/RandomNumber';


const messages = [
  {
    id: generateRandomId(),
    type: "incomingMessage",
    content: "I won't be impressed with technology until I can download food.",
    username: "Anonymous1"
  },
  {
    id: generateRandomId(),
    type: "incomingNotification",
    content: "Anonymous1 changed their name to nomnom",
  },
  {
    id: generateRandomId(),
    type: "incomingMessage",
    content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
    username: "Anonymous2"
  },
  {
    id: generateRandomId(),
    type: "incomingMessage",
    content: "...",
    username: "nomnom"
  },
  {
    id: generateRandomId(),
    type: "incomingMessage",
    content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
    username: "Anonymous2"
  },
  {
    id: generateRandomId(),
    type: "incomingMessage",
    content: "This isn't funny. You're not funny",
    username: "nomnom"
  },
  {
    id: generateRandomId(),
    type: "incomingNotification",
    content: "Anonymous2 changed their name to NotFunny",
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
      id: generateRandomId(),
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