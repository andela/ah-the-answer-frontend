import React from 'react';
import { shallow, mount } from '../../enzyme';
import ButtonBadge from '../../../containers/profile/components/SocialFollowing';

describe('Test follow/follower display', () => {

  it('renders without crashing', () => {
    mount(<ButtonBadge />);
  });

});
