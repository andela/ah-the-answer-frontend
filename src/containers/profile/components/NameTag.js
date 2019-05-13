import React from 'react';


const NameTag = ({firstName, secondName}) => (
  <div className="container d-flex align-items-center">
    <div>
      <h3 className="display-4">
        {firstName || 'Name'}
      </h3>
      <h5 className="text-primary">
        @{secondName || "Username"}
      </h5>
    </div>
    <div className="ml-auto">
      <a className="btn btn-outline-primary" href="/user/editprofile">Edit Profile</a>
    </div>
  </div>
);

export default NameTag;
