import React, { Component } from 'react';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>

        <Navbar />

        <main class="messages">
          <div class="message">
            <span class="message-username">Anonymous1</span>
            <span class="message-content">I won't be impressed with technology until I can download food.</span>
          </div>
          <div class="message system">
            Anonymous1 changed their name to nomnom.
          </div>
        </main>

        <footer class="chatbar">
          <input class="chatbar-username" placeholder="Your Name (Optional)" />
          <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>

      </div>
    );
  }
}
export default App;
