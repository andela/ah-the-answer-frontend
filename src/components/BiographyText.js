import React, { Component } from 'react';


class BioText extends Component {
  componentDidMount() {
    this.props.textUpdateMethod();
  }

  render() {
    return (
      <div className="container">
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default BioText;
