import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from '../../enzyme';
import { FollowedUsers } from '../../../containers/follow/followingList';

describe('Test followList conmponent', () => {
    it('renders', () => {
        const mockFtn = jest.fn();
        const wrapper = mount(
        <BrowserRouter>
            <FollowedUsers
            getFollowings={mockFtn}
            followings={["tyrion"]}
            />
        </BrowserRouter>,
        );
        expect(wrapper.exists()).toBe(true);
    });
});