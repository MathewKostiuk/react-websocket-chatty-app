import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      return <Message
      key={ message.key }
      username={ message.username }
      content={ message.content } />
    })
    return (
      <main className="messages">
        { messages }
        <div className='message-system'>
        </div>
      </main>
      );
  }
}

export default MessageList;