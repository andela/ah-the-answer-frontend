import React, { Component } from 'react';
import axios from 'axios';

const ButtonBadge = (props) => {
  return (
    <div className="container">
      <button type="button" onClick = {props.updateFollows} className="btn btn-primary">
          {props.buttonName}
        <span className="badge">
           {props.badgeNumber}
        </span>
      </button>
    </div>
  );
};


export default ButtonBadge;
