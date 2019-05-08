import React, { Component } from 'react';


class NameTag extends Component {
  componentDidMount() {
    this.props.textUpdateMethod();
  }

  render() {
    return (
      <div className="container">
        <h5>
            Username: {this.props.firstName} Name: {this.props.secondName}
        </h5>
      </div>
    );
  }
}

export default NameTag;
