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
      type: '',
      oldUsername: this.state.currentUser.name
    };
    if (username !== this.state.currentUser.name) {
      newMessage.type = 'postNotification';
      this.setState({
        currentUser: {name: username}
      });
    } else {
      newMessage.type = 'postMessage';
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    console.log('Connected to server');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Determine plurality of online users
      if (data.type === 'onlineUsers' && data.number <= 1 ) {
        this.setState({
          onlineUsers: data.number + ' user online'
        });
        return;
      } if (data.type === 'onlineUsers' && data.number > 1) {
        this.setState({
          onlineUsers: data.number + ' users online'
        });
        return;
      }
      // Structure message based on event data
        const message = {
          key: data.key,
          username: data.username,
          content: data.content,
          type: data.type,
          notification: '',
          colour: data.colour,
          oldUsername: data.oldUsername
        };
        // Construct notification message based on data-type
      if (data.type === 'incomingNotification') {
        message.notification = data.oldUsername + ' has changed their name to '+ data.username;
      }
      // Make new array of messages
      const messages = this.state.messages.concat(message);
      this.setState({
          messages: messages
        });
    };
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
