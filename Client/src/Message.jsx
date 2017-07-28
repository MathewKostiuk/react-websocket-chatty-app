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
    const style = {color: this.props.colour};
    return (
      <div>
      <div className='message'>
        <span className="message-username" style={style}>{ this.props.username }</span>
        <span className="message-content">{ this.props.content }</span>
      </div>
        {this.parseType()}
        </div>
      );
  }
}

export default Message;