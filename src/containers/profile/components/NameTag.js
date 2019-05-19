import React from 'react';
import authUser from '../../../helpers/authUser';
import FollowButton from '../../follow/followButton';

const userDetails = authUser();

const NameTag = ({ firstName, userName, followers }) => (
  <div className="container d-flex align-items-center">
    <div>
      <h3 className="display-4">
        {firstName || 'Name'}
      </h3>
      <h5 className="text-primary">
        @{userName || "Username"}
      </h5>
    </div>
    <div className="ml-auto">
      {
        (userDetails.username === userName) ? (
          <a className="btn btn-outline-primary" href="/editprofile">Edit Profile</a>
        ) : (
          <FollowButton
            userName={{ userName }}
            followers={followers}
          />
        )
      }
    </div>
  </div>
);

export default NameTag;
