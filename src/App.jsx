import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
       messages: []
    };
  }

  addMessage(content, username)  {
    const newMessage = {
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message = {
        key: data.key,
        username: data.username,
        content: data.content
      }
      const messages = this.state.messages.concat(message);
      this.setState({
        messages: messages,
        currentUser: {name: data.username}
      });
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log('Connected to server');

  }
  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={ this.state.messages }/>
        <Chatbar currentUser={this.state.currentUser.name} addMessages={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
