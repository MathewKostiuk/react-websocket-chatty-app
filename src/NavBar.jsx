import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    console.log('rendering NavBar');
    return(
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}
export default NavBar;