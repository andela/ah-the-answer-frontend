import React from 'react';

const SocialFollowing = ({socialName, number}) => (
  <div className="container">
    <p className="text-center">{number || 999} {socialName || "Social Media Point"}</p>
  </div>
);

export default SocialFollowing;
