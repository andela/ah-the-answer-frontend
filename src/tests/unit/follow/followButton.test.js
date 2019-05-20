import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from '../../enzyme';
import { FollowButton } from '../../../containers/follow/followButton';
import { ConnectedSocialFollowing } from '../../../containers/profile/components/connectedSocialFollowing';

describe('Test FollowButton container', () => {
    it('renders', () => {
      const mockFtn = jest.fn();
      const wrapper = mount(
        <BrowserRouter>
          <FollowButton
            follow={mockFtn}
            unFollow={mockFtn}
            checkFollow={mockFtn}
            fetchFollowers={mockFtn}
            updateProfile={mockFtn}
            userName={'user'}
            checkFollowResponse={true}
          />
        </BrowserRouter>,
        );

      expect(wrapper.exists()).toBe(true);
    });

    it('should follow unfollowed user', () => {
        const mockFtn = jest.fn();
        const wrapper = shallow(<FollowButton
            userName={'user'} 
            follow={mockFtn}
            checkFollow={mockFtn}
            fetchFollowers={mockFtn}
        />);
        wrapper.setProps({
            userName: "darius"
        });
        const spy = jest.spyOn(wrapper.instance(), 'handleClick')

        const initialState = wrapper.instance().state.followStatus
        wrapper.instance().handleClick()
        wrapper.update()
        const currentState = wrapper.instance().state.followStatus
        
        expect(spy).toBeCalled()
        expect(initialState).toBe(undefined)
        expect(currentState).toBe(true)
    });

    it('should unfollow followed user', () => {
        const mockFtn = jest.fn();
        const wrapper = shallow(<FollowButton 
            unFollow={mockFtn}
            userName={'user'}
            checkFollow={mockFtn}
            fetchFollowers={mockFtn}
        />);
        wrapper.setProps({
            userName: "darius"
        });
        wrapper.setState({
            followStatus: true
        })
        const spy = jest.spyOn(wrapper.instance(), 'handleClick')

        const initialState = wrapper.instance().state.followStatus
        wrapper.instance().handleClick()
        wrapper.update()
        const currentState = wrapper.instance().state.followStatus
        
        expect(spy).toBeCalled()
        expect(initialState).toBe(true)
        expect(currentState).toBe(false)
    });
  });

  describe('Test followers container', () => {
    it('renders', () => {
      const mockFtn = jest.fn();
      const wrapper = mount(
        <BrowserRouter>
          <ConnectedSocialFollowing
            getFollowers={mockFtn}
            userName={'user'}
            followers={1}
          />
        </BrowserRouter>,
        );

      expect(wrapper.exists()).toBe(true);
    });
  });