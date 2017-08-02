import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      // Loop through messages array, assign attributes
      return <Message
        key={ message.key }
        username={ message.username }
        content={ message.content }
        type={message.type}
        notification={message.notification}
        colour={message.colour} />
    })
    return (
      <main className="messages">
        { messages }
      </main>
      );
  }
}

export default MessageList;