import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from '../../enzyme';
import { Followers } from '../../../containers/follow/followers';

describe('Test followers conmponent', () => {
    it('renders', () => {
        const mockFtn = jest.fn();
        const wrapper = mount(
        <BrowserRouter>
            <Followers
                getFollowers={mockFtn}
                followers={["tyrion"]}
            />
        </BrowserRouter>,
        );
        expect(wrapper.exists()).toBe(true);
    });
    it('test methods', () => {
        const mockFtn = jest.fn();
        const wrapper = shallow(<Followers
            getFollowers={mockFtn}
            followers={["tyrion"]}
         />
        );

        const spy = jest.spyOn(wrapper.instance(), 'componentDidMount');

        wrapper.instance().componentDidMount()

        expect(spy).toBeCalled()
    });
    it('test methods', () => {
        const mockFtn = jest.fn();
        const wrapper = shallow(<Followers
            getFollowers={mockFtn}
            followers={["tyrion"]}
         />
        );

        wrapper.setProps({followers: ['tyrion', 'tywin']});
        expect(wrapper.state().followers).toEqual(['tyrion', 'tywin']);
    });
});