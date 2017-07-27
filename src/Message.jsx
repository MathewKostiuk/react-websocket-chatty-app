import React, {Component} from 'react';

class Message extends Component {
  parseType() {
    switch(this.props.type) {
      case "incomingMessage":
        return;
        break;
      case "incomingNotification":
        return  <div className='message-system'>
        {this.props.notification}
        </div>
        break;
    }
  }

  render() {
    return (
      <div className='message'>
        <span className="message-username">{ this.props.username }</span>
        <span className="message-content">{ this.props.content }</span>
        {this.parseType()}
      </div>
      );
  }
}

export default Message;