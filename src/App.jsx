import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import ChatWindow from './Chat-Window.jsx';
import Footer from './Footer.jsx';

class App extends Component {
  render() {
    return (
      <div>

        <Navbar />
        <ChatWindow />
        <Footer />

      </div>
    );
  }
}
export default App;
