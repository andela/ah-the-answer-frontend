import React from 'react';
//import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from '../../enzyme';
import SocialFollowing from '../../../containers/profile/components/SocialFollowing';
import NameTag from '../../../containers/profile/components/NameTag';
import BiographyText from '../../../containers/profile/components/BiographyText';
import Card from '../../../containers/profile/components/Card';
import  ProfileUpdateForm from '../../../containers/profile/components/ProfileUpdateForm';


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

describe('Test BioraphyText component', () => {
  it('renders', () => {
    const wrapper = shallow(<BiographyText />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a biography with given text', () => {
    const wrapper = shallow(<BiographyText text="A short summary about me and my interests." />);
    const text = wrapper.find('p').text();
    expect(text).toEqual('A short summary about me and my interests.');
  });
});

describe('Test default Card component', () => {
  it('renders', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a card with default information', () => {
    const wrapper = shallow(<Card />);
    const cardTitle = wrapper.find('h4').text();
    const text = wrapper.find('p').text();
    expect(cardTitle).toEqual('Article Title');
    expect(text).toEqual('First 15 Words...');
  });
});

describe('Test ProfileUpdateForm component', () => {
  it('renders', () => {
    const wrapper = mount(<ProfileUpdateForm />);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays props as default field values', () => {
    const wrapper = mount(<ProfileUpdateForm name="Billy" bio="Short Summary" />);
    wrapper.setProps({ name: 'Billy' });
    wrapper.setProps({ bio: 'Short Summary' });
    const username = wrapper.find('#editName');
    const bioText = wrapper.find('#editBio');
    expect(username.props().defaultValue).toEqual('Billy');
    expect(bioText.props().defaultValue).toEqual('Short Summary');
  });

  
});


