import React, { Component } from 'react';
import RetroHitCounter from 'react-retro-hit-counter';

const YourComponent = (props) => (
  <RetroHitCounter
    hits={props.userCount}
    /* The following are all default values: */
    withBorder={true}
    withGlow={false}
    minLength={4}
    size={40}
    padding={4}
    digitSpacing={3}
    segmentThickness={4}
    segmentSpacing={0.5}
    segmentActiveColor="#0"
    segmentInactiveColor="none"
    backgroundColor="none"
    borderThickness={0}
    glowStrength={0.5}
  />
);
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="user-counter">Total User Count
        <YourComponent userCount={this.props.userCount} />
        </span>
      </nav>
    )
  }
}
export default Navbar;