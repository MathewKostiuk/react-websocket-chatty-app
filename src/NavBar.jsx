import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return(
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <a href='/' className='navbar-brand online-users'>{this.props.onlineUsers}</a>
      </nav>
    );
  }
}
  export default NavBar;