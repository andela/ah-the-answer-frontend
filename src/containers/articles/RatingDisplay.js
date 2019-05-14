import React from 'react';

const RatingDisplay = ({number}) => (
  <div className="container">
    <p className="text-center">{number || 0} Star </p>
  </div>
);

export default RatingDisplay;