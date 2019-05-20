import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as ProfileAction from '../../../store/actionTypes/profileActionTypes';
import { shallow, mount } from '../../enzyme';
import ConnectedSocialFollowing from '../../../containers/profile/components/connectedSocialFollowing';
import SocialFollowing from '../../../containers/profile/components/SocialFollowing';
import NameTag from '../../../containers/profile/components/NameTag';
import BiographyText from '../../../containers/profile/components/BiographyText';
import Card from '../../../containers/profile/components/Card';
import { ProfileUpdateForm } from '../../../containers/profile/components/ProfileUpdateForm';
import ConnectedProfileUpdate, { ProfileUpdate } from '../../../containers/profile/ProfileUpdate';
import ConnectedProfileView, { ProfileView } from '../../../containers/profile/profileContainer';
import Profile from '../../../store/reducers/profileReducer';
import ViewProfile from '../../../containers/profile/profileView';
import App from '../../../App';
import store from '../../../store/store';

const initialState = {
  follows: 0,
  followers: 0,
  givenName: 'Bob',
  userName: 'User',
  bio: 'Default Story',
  profileImg: '...',
};

describe('Test SocialFollowing component', () => {
  it('renders', () => {
    const wrapper = shallow(<SocialFollowing />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a given number', () => {
    const wrapper = shallow(<SocialFollowing number={10} />);
    const text = wrapper.find('p').text();
    expect(text).toEqual('10 ');
  });

  it('renders a given social media point name', () => {
    const wrapper = shallow(<SocialFollowing socialName="Follows" />);
    const text = wrapper.find('p').text();
    expect(text).toEqual('0 Follows');
  });
});

describe('Test NameTag component', () => {
  it('renders', () => {
    const wrapper = shallow(<NameTag />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a given first name', () => {
    const wrapper = shallow(<NameTag firstName="John" />);
    const text = wrapper.find('h3').text();
    expect(text).toEqual('John');
  });

  it('renders a given second name', () => {
    const wrapper = shallow(<NameTag userName="Doe" />);
    const text = wrapper.find('h5').text();
    expect(text).toEqual('@Doe');
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
  const mockFtn = jest.fn();
  it('renders', () => {
    const wrapper = mount(
      <BrowserRouter>
        <ProfileUpdateForm updateMessage={false} resetProfileUpdate={mockFtn} />
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('displays props as default field values', () => {
    const wrapper = mount(
        <ProfileUpdateForm name="Billy" bio="Short Summary" updateMessage={false} resetProfileUpdate={mockFtn} />,
    );
    wrapper.setProps({ name: 'Billy' });
    wrapper.setProps({ bio: 'Short Summary' });
    const username = wrapper.find('#editName');
    const bioText = wrapper.find('#editBio');
    expect(username.props().defaultValue).toEqual('Billy');
    expect(bioText.props().defaultValue).toEqual('Short Summary');
  });

  it('Should capture name and bio correctly onChange ', () => {
    const wrapper = mount(
      <ProfileUpdateForm name="Billy" bio="Short Summary" updateMessage={false} resetProfileUpdate={mockFtn} />,
    );
    wrapper.setProps({ name: 'Billy' });
    wrapper.setProps({ bio: 'Short Summary' });
    const username = wrapper.find('#editName');
    const bioText = wrapper.find('#editBio');
    username.instance().value = 'Batman';
    username.simulate('change');
    bioText.instance().value = 'Long Story';
    bioText.simulate('change');
    expect(username.instance().value).toEqual('Batman');
    expect(bioText.instance().value).toEqual('Long Story');
  });

  it('tests function fire', () => {
    const wrapper = mount(
      <ProfileUpdateForm name="Billy" bio="Short Summary" updateMessage={false} resetProfileUpdate={mockFtn} updateProfile={mockFtn} />,
    );
    const spy = jest.spyOn(wrapper.instance(), 'handleOnSubmit');
    wrapper.find('form').simulate('submit');
  });
});

describe('Test ProfileUpdate container', () => {
  it('renders', () => {
    const mockFtn = jest.fn();
    const wrapper = mount(
      <BrowserRouter>
        <ProfileUpdate
          fetchBio={mockFtn}
          fetchName={mockFtn}
          resetProfileUpdate={mockFtn}
          updateProfile={mockFtn}
          profileprops={{ givenName: 'Bob', bio: 'Default Story', updateMessage: false }}
        />
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Test ProfileView component', () => {
  it('renders', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    const mockFtn = jest.fn();
    const wrapper = shallow(
      <ConnectedProfileView
          store={store}
          fetchBio={mockFtn}
          fetchName={mockFtn}
          fetchFollows={mockFtn}
          fetchFollowers={mockFtn}
          match={{
            params: {
              username: 'User'
            },
          }}
          profileprops={{
            givenName: 'Bob',
            userName: 'User',
            bio: 'Default Story',
            follows: 0,
            followers: 0,
            profileImg: '...',
            follows: {
              checkfollow: true
            },
          }}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });
  it('updates state with store data', () => {
    const data = {
      givenName: 'Bob',
      userName: 'User',
      bio: 'Default Story',
      follows: 0,
      followers: 0,
      follows: {
        checkfollow: true
      },
    }
    const wrapper = shallow(<ProfileView 
      profileprops={data}
      match={{
        params: {
          username: 'User'
        },
      }}
      fetchBio={jest.fn()}
      fetchName={jest.fn()}
      fetchFollows={jest.fn()}
      fetchFollowers={jest.fn()}
    />)
    const spy = jest.spyOn(wrapper.instance(), 'componentDidMount');

    wrapper.instance().componentDidMount()

    expect(spy).toBeCalled()
    expect(wrapper.instance().state).toEqual(data)
  });
  it('updates state with new data', () => {
    const data = {
      givenName: 'Bob',
      userName: 'User',
      bio: 'Default Story',
      follows: 0,
      followers: 0,
      follows: {
        checkfollow: true
      },
    }
    const wrapper = shallow(<ProfileView 
      profileprops={data}
      match={{
        params: {
          username: 'User'
        },
      }}
      fetchBio={jest.fn()}
      fetchName={jest.fn()}
      fetchFollows={jest.fn()}
      fetchFollowers={jest.fn()}
    />)
    const spy = jest.spyOn(wrapper.instance(), 'componentDidMount');

    wrapper.instance().componentDidMount()
    const initState = wrapper.instance().state

    console.log(wrapper.instance())

    expect(spy).toBeCalled()
    expect(initState).toEqual(data)
  });
});

describe('Test "fetchBio" reducer', () => {
  it('renders', () => {
    const action = { type: ProfileAction.FETCH_BIO, userBio: 'Biography Update' };
    const response = Profile(initialState, action);
    expect(response.bio).toEqual('Biography Update');
  });
});

describe('Test "fetchFollows" reducer', () => {
  it('renders', () => {
    const action = { type: ProfileAction.FETCH_FOLLOWS, followCount: 5 };
    const response = Profile(initialState, action);
    expect(response.follows).toEqual(5);
  });
});

describe('Test "fetchFollowers" reducer', () => {
  it('renders', () => {
    const action = { type: ProfileAction.FETCH_FOLLOWERS, followerCount: 10 };
    const response = Profile(initialState, action);
    expect(response.followers).toEqual(10);
  });
});

describe('Test "fetchName" reducer', () => {
  it('renders', () => {
    const action = { type: ProfileAction.FETCH_NAME, givenName: 'Grace', userName: 'Athena' };
    const response = Profile(initialState, action);
    expect(response.givenName).toEqual('Grace');
    expect(response.userName).toEqual('Athena');
  });
});

describe('Test "fetchAvatar" reducer', () => {
  it('renders', () => {
    const action = { type: ProfileAction.FETCH_AVATAR, profilePicture: '...' };
    const response = Profile(initialState, action);
    expect(response.profileImg).toEqual('...');
  });
});

describe('Test "updateProfile" reducer', () => {
  it('renders', () => {
    const action = { type: ProfileAction.UPDATE_PROFILE, updateMessage: 'Message Updated' };
    const response = Profile(initialState, action);
    expect(response.updateMessage).toEqual('Message Updated');
  });
});

describe('Test "resetUpdate" reducer', () => {
  it('renders', () => {
    const action = { type: ProfileAction.RESET_UPDATE_MESSAGE, updateMessage: false };
    const response = Profile(initialState, action);
    expect(response.updateMessage).toEqual(false);
  });
});

describe('Test viewProfile function that routes the profile containers', () => {
  it('renders', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ViewProfile />
      </Provider>,
    );
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Test that the redux connected "ProfileView" component renders', () => {
  it('renders', () => {
    const wrapper = shallow(
      <BrowserRouter>
      <Provider store={store}>
        <ConnectedProfileView />
      </Provider>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Test that the redux connected "ProfileUpdate" component renders', () => {
  it('renders', () => {
    const wrapper = mount(
     <BrowserRouter>
       <Provider store={store}>
         <ConnectedProfileUpdate />
       </Provider>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
  });
});