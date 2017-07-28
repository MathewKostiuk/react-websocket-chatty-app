import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
       messages: [],
       onlineUsers: 1
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
    this.socket = new WebSocket('ws://localhost:3001');
    console.log('Connected to server');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);


      if (data.type === 'onlineUsers' && data.number <= 1 ) {
        this.setState({
          onlineUsers: data.number + ' user online'
        });
        return;
      } if (data.type === 'onlineUsers' && data.number > 1) {
        this.setState({
          onlineUsers: data.number + ' users online'
        })
        return;
      }
        const message = {
          key: data.key,
          username: data.username,
          content: data.content,
          type: data.type,
          notification: '',
          colour: data.colour
        }

      if (data.type === 'incomingNotification') {
        message.notification = this.state.currentUser.name + ' has changed their name to '+ data.username;
      }
      const messages = this.state.messages.concat(message);
      this.setState({
          messages: messages,
          currentUser: {name: data.username}
        });
    }
  }
  render() {
    return (
      <div>
        <NavBar onlineUsers={this.state.onlineUsers} />
        <MessageList messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser.name} addMessages={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
