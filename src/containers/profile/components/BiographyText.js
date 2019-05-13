import React from 'react';


const BioText = ({ text }) => (
  <div className="container mt-4">
    <h4>Bio</h4>
    <p className="text-justify">{text || 'User bio here'}</p>
  </div>
);

export default BioText;
