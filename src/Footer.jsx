import React, { Component } from 'react';
const defaultSrc =
  'https://funnygoblin.com/wp-content/uploads/2017/07/Meme-Flashback-These-Are-The-Best-Memes-From-The-Decade-2000-2010.jpg';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultUsername: 'Anon',
      username: '',
      text: '',
      user: '',
      src: defaultSrc
    }
    this.onUser = this.onUser.bind(this);
    this.onText = this.onText.bind(this);
    this.onTextEnterPress = this.onTextEnterPress.bind(this);
    this.onNameEnterPress = this.onNameEnterPress.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  onUser(evt) {
    this.setState({
      user: evt.target.value
    });
  }

  onText(evt) {
    this.setState({
      text: evt.target.value
    });
  }
  onTextEnterPress = (evt) => {
    if (evt.keyCode == 13 && evt.shiftKey == false) {
      evt.preventDefault();
      const messageObj = {
        type: 'incomingMessage',
        username: (this.state.username || this.state.defaultUsername),
        content: this.state.text
      }
      this.props.newMessage(messageObj);
      this.setState({
        text: ''
      })
    }
  }

  onNameEnterPress = (evt) => {
    if (evt.keyCode == 13 && evt.shiftKey == false) {
      evt.preventDefault();
      const previousUserName = (this.state.username || this.state.defaultUsername);
      const notification = `User ${previousUserName} changed their name to ${this.state.user}`;

      const messageObj = {
        type: 'incomingNotification',
        content: notification
      }

      this.setState({
        username: this.state.user
      })

      //Broadcast name change
      this.props.newMessage(messageObj);
    }
  }

  handleEnterPress = event => {
    if (event.key === 'Enter') {
      event.target.select();
      this.setState({
        src: event.target.value
      });
    }
  };


  render() {

    return (
      <footer className="chatbar">
        <textarea className="chatbar-username" placeholder="Your Name and ENTER" rows="1" value={this.state.user} onChange={this.onUser} onKeyDown={this.onNameEnterPress} />
        <textarea className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.text} onChange={this.onText} onKeyDown={this.onTextEnterPress} />
      </footer>
    )
  }
}

export default Footer;