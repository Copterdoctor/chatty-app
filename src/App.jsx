import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import ChatWindow from './Chat-Window.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket(`ws://localhost:3001/`),
      this.state = {
      }
  }

  componentDidMount() {
    this.socket.onopen = (evt) => {
      console.log('Connected to socket!', evt);
    }
  }
  render() {
    return (
      <div>

        <Navbar />
        <ChatWindow />

      </div>
    );
  }
}
export default App;
