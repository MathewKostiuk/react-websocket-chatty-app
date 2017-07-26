import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {username: props.currentUser};

    this.handleInput = this.handleInput.bind(this);
  }

handleInput(event) {
  const name = event.target.name;
  const value = event.target.value;
  this.setState({
    [name]: value
  });
}

  render() {
    return (
      <footer className='chatbar'>
        <input name='username' className='chatbar-username' defaultValue={this.state.username} onChange={this.handleInput} />
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyDown={(event) => {
          if (event.key === 'Enter') {
            this.props.addMessages(event.target.value, this.state.username);
            event.target.value = '';
          }
        }} />
      </footer>
      );
  }
}

export default Chatbar;