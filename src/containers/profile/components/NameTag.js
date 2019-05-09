import React from 'react';


const NameTag = ({firstName, secondName}) => (
  <div className="container">
    <h5>
      Name: {firstName} Username: {secondName}
    </h5>
  </div>
);

export default NameTag;
