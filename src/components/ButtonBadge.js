import React, { Component } from 'react';

class ButtonBadge extends Component {
  componentDidMount() {
    this.props.badgeUpdateMethod();
  }

  render() {
    return (
      <div className="container">
        <button type="button" className="btn btn-primary">
          {this.props.buttonName}
          <span className="badge">
            {this.props.badgeNumber}
          </span>
        </button>
      </div>
    );
  }
}


export default ButtonBadge;
