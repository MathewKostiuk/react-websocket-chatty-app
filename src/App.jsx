import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
import Message from './Message.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
       messages: []
    };
  }

  addMessage(content, username)  {
    const newMessage = {
      username: username,
      content: content,
      type: ''
    };
    if (username !== this.state.currentUser.name) {
      newMessage.type = 'postNotification'
    } else {
      newMessage.type = 'postMessage'
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log('Connected to server');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const notif = this.state.currentUser.name + ' has changed their name to '+ data.username;

      const message = {
        key: data.key,
        username: data.username,
        content: data.content,
        type: data.type,
        notification: ''
      }

      if (data.type === 'incomingNotification') {
        message.notification = this.state.currentUser.name + ' has changed their name to '+ data.username;
      }

      console.log(message);
      const messages = this.state.messages.concat(message);
      this.setState({
          messages: messages,
          previousUser: {name: this.state.currentUser.name},
          currentUser: {name: data.username}
        });
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} previousUser={this.state.previousUser} />
        <Chatbar currentUser={this.state.currentUser.name} addMessages={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
