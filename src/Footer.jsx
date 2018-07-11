import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      text: ''
    }
    this.onUser = this.onUser.bind(this);
    this.onText = this.onText.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  onUser(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  onText(evt) {
    this.setState({
      text: evt.target.value
    });
  }
  onEnterPress = (evt) => {
    if (evt.keyCode == 13 && evt.shiftKey == false) {
      evt.preventDefault();
      const messageObj = {
        type: "incomingMessage",
        username: this.state.username,
        content: this.state.text
      }
      this.props.newMessage(messageObj);
      this.setState({
        text: ""
      })

    }
  }

  render() {

    return (
      <footer className="chatbar">
        <textarea className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.username} onChange={this.onUser} />
        <textarea className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.text} onChange={this.onText} onKeyDown={this.onEnterPress} />
      </footer>
    )
  }
}

export default Footer;