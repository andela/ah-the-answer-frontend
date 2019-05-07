import React, { Component } from 'react';
import axios from 'axios';

class ButtonBadge extends Component {

  state = {
    badgeNumber: 999
  };

  componentDidMount(){
    axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/')
    .then(response => {
      this.setState({
        badgeNumber: response.data.success[0].follows
      })
    })
    .catch(error => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
  }

  render() {
    return (
    <div className="container">
      <button type="button" className="btn btn-primary">
       {this.props.buttonName}
         <span className="badge">
           {this.state.badgeNumber}
         </span> 
      </button>
    </div>
    );
  }
}

export default ButtonBadge;
