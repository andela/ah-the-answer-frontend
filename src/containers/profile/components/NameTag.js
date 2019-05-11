import React from 'react';


const NameTag = ({firstName, secondName}) => (
  <div className="container">
    <h5>
      Name: {firstName || "Name"} Username: {secondName || "Username"}
    </h5>
  </div>
);

export default NameTag;
