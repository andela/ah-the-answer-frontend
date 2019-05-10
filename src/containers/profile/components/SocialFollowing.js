import React from 'react';

const SocialFollowing = ({socialName, number}) => (
  <div className="container">
    <p className="text-center">{number} {socialName}</p>
  </div>
);

export default SocialFollowing;
