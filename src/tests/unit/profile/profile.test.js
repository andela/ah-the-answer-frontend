import React from 'react';
import { shallow, mount } from '../../enzyme';
import SocialFollowing from '../../../containers/profile/components/SocialFollowing';
import NameTag from '../../../containers/profile/components/NameTag';

describe('Test SocialFollowing component', () => {
  it('renders', () => {
    const wrapper = shallow(<SocialFollowing />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a given number', () => {
    const wrapper = shallow(<SocialFollowing number={10} />);
    const text = wrapper.find('p').text();
    expect(text).toEqual('10 Social Media Point');
  });

  it('renders a given social media point name', () => {
    const wrapper = shallow(<SocialFollowing socialName="Follows" />);
    const text = wrapper.find('p').text();
    expect(text).toEqual('999 Follows');
  });
});

describe('Test NameTag component', () => {
  it('renders', () => {
    const wrapper = shallow(<NameTag />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a given first name', () => {
    const wrapper = shallow(<NameTag firstName="John" />);
    const text = wrapper.find('h5').text();
    expect(text).toEqual('Name: John Username: Username');
  });

  it('renders a given second name', () => {
    const wrapper = shallow(<NameTag secondName="Doe" />);
    const text = wrapper.find('h5').text();
    expect(text).toEqual('Name: Name Username: Doe');
  });
});
