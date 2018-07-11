import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import ChatWindow from './Chat-Window.jsx';


class App extends Component {

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
