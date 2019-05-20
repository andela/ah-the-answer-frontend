import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from '../../enzyme';
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
    it('test methods', () => {
        const mockFtn = jest.fn();
        const wrapper = shallow(<FollowedUsers
            getFollowings={mockFtn}
            followings={["tyrion"]}
         />
        );

        const spy = jest.spyOn(wrapper.instance(), 'componentDidMount');

        wrapper.instance().componentDidMount()

        expect(spy).toBeCalled()
    });
    it('test methods', () => {
        const mockFtn = jest.fn();
        const wrapper = shallow(<FollowedUsers
            getFollowings={mockFtn}
            followings={["tyrion"]}
         />
        );

        wrapper.setProps({followings: ['tyrion', 'tywin']});
        expect(wrapper.state().followings).toEqual(['tyrion', 'tywin']);
    });
});