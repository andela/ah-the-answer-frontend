import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from '../../enzyme';
import { Followers } from '../../../containers/follow/followers';

describe('Test followers conmponent', () => {
    it('renders', () => {
        const mockFtn = jest.fn();
        const wrapper = mount(
        <BrowserRouter>
            <Followers
                getFollowers={mockFtn}
                followings={["tyrion"]}
            />
        </BrowserRouter>,
        );
        expect(wrapper.exists()).toBe(true);
    });
});