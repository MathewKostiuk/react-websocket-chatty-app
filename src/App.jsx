import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
       messages: [],
       notificationString: ''
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
      const message = {
        key: data.key,
        username: data.username,
        content: data.content
      }
      const messages = this.state.messages.concat(message);

      switch(data.type) {
        case "incomingMessage":
        this.setState({
          messages: messages,
          currentUser: {name: data.username},
          notificationString: ''

        });
        break;
        case "incomingNotification":
        this.setState({
          notificationString: `${this.state.currentUser.name} changed their name to ${data.username}`,
          messages: messages,
          currentUser: {name: data.username}
        })
        break;
        default:

        throw new Error("Unknown event type " + data.type);
      }
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} notification={this.state.notificationString}/>
        <Chatbar currentUser={this.state.currentUser.name} addMessages={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
