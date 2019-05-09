import React from 'react';

const ButtonBadge = ({buttonName, badgeNumber}) => (
  <div className="container">
    <button type="button" className="btn btn-primary">
      {buttonName}
      <span className="badge">
        {badgeNumber}
      </span>
    </button>
  </div>
);

export default ButtonBadge;
