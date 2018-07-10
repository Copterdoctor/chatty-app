import React, { Component } from 'react';
import Footer from './Footer.jsx';
const messages = [
  {
    type: "incomingMessage",
    content: "I won't be impressed with technology until I can download food.",
    username: "Anonymous1"
  },
  {
    type: "incomingNotification",
    content: "Anonymous1 changed their name to nomnom",
  },
  {
    type: "incomingMessage",
    content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
    username: "Anonymous2"
  },
  {
    type: "incomingMessage",
    content: "...",
    username: "nomnom"
  },
  {
    type: "incomingMessage",
    content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
    username: "Anonymous2"
  },
  {
    type: "incomingMessage",
    content: "This isn't funny. You're not funny",
    username: "nomnom"
  },
  {
    type: "incomingNotification",
    content: "Anonymous2 changed their name to NotFunny",
  },
]
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: messages
    }
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(message) {
    console.log(message);

    const oldMessages = this.state.messages;
    const newMessageObj = {
      type: "incomingMessage",
      content: message.content,
      username: message.username
    };
    const newMessages = [...oldMessages, newMessageObj];
    this.setState({ messages: newMessages });
  }

  render() {
    const chatMessages = this.state.messages.map((message) => {
      return (
        <div className={message.content}>
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