import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder={ this.props.currentUser.name } />
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyDown={(event) => {
          if (event.key === 'Enter') {
            this.props.addMessages(event.target.value, this.props.currentUser.name);
            event.target.value = '';
          }
        }} />
      </footer>
      );
  }
}

export default Chatbar;