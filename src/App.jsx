import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
       messages: [
         {
           username: "Bob",
           content: "Has anyone seen my marbles?",
           id: 1
         },
         {
           username: "Anonymous",
           content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
           id: 2
         }
       ]
    }
  }

  addMessage(content, username)  {
    const newMessage = {
      username: username,
      content: content,
      id: Math.random()
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState(
      {messages: messages}
    );
    this.socket.send(JSON.stringify(newMessage));
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
        <Chatbar currentUser={ this.state.currentUser } addMessages={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
