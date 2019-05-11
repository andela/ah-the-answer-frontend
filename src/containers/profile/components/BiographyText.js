import React from 'react';


const BioText = ({ text }) => (
  <div className="container">
    <p className="text-justify">{text || 'User bio here'}</p>
  </div>
);

export default BioText;
