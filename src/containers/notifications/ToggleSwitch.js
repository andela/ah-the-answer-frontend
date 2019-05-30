
import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Toggle extends Component {
  render() {
    return (
      <div className=" container Notification article-details">
        <p>Manage Notifications</p>
        { this.props.isSubscribed ? <div onClick={this.props.handleClick} className="btn  btn-secondary btn-sm">OFF</div>
          : <div onClick={this.props.handleClick} className="btn  btn-success btn-sm">ON</div> }
      </div>
    );
  }
}

export default Toggle;
