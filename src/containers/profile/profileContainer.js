/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchFollows, fetchFollowers, fetchBio, fetchName,
} from '../../store/actions/profileActions';
import Card from './components/Card';
import BiographyText from './components/BiographyText';
import NameTag from './components/NameTag';
import SocialFollowing from './components/SocialFollowing';
// eslint-disable-next-line import/no-named-as-default
import ConnectedSocialFollowing from './components/connectedSocialFollowing';
import Bookmarks from '../../containers/bookmarks/Bookmarks';
import authUser from '../../helpers/authUser';

const userDetails = authUser();

export class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follows: 0,
      followers: 0,
      bio: '',
      userName: '',
      givenName: '',
    };
  }

  componentDidMount() {
    const {
      fetchName,
      fetchBio,
      fetchFollows,
      fetchFollowers,
    } = this.props;

    const username = this.props.match.params.username;

    if (!username) {
      this.props.history.push('/');
    }

    fetchName(username);
    fetchBio(username);
    fetchFollows(username);
    fetchFollowers(username);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.followers !== nextProps.profileprops.followers
      || prevState.follows !== nextProps.profileprops.follows
      || prevState.bio !== nextProps.profileprops.bio
      || prevState.userName !== nextProps.profileprops.userName
      || prevState.givenName !== nextProps.profileprops.givenName) {
      return {
        follows: nextProps.profileprops.follows,
        followers: nextProps.profileprops.followers,
        bio: nextProps.profileprops.bio,
        userName: nextProps.profileprops.userName,
        givenName: nextProps.profileprops.givenName,
      };
    }
    return null;
  }

  render() {
    const {
      follows,
      followers,
      bio,
      userName,
      givenName,
    } = this.state;
    return (
      <div className="container py-2">
        <div className="row">
          <div className="col-4">
            <img src="https://res.cloudinary.com/apibucket/image/upload/v1554188102/sample.jpg" className="img-fluid" alt="Placholder" id="profileImageID" />
          </div>
          <div className="col-6">
            <div className="row">
              <NameTag
                firstName={givenName}
                userName={this.props.match.params.username}
                followers={followers}
              />
            </div>
            <div className="row">
              <BiographyText
                text={bio}
              />
            </div>
            {
              (userDetails.username === userName) ? (
                <div className="row">
                  <div className="col-6">
                    <Link to={`/followings/${userName}`}>
                      <SocialFollowing
                        socialName="Follows"
                        number={follows}
                      />
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link to={`/follows/${userName}`}>
                      <SocialFollowing
                        socialName="Followers"
                        number={followers}
                      />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-6">
                    <SocialFollowing
                      socialName="Follows"
                      number={follows}
                    />
                  </div>
                  <div className="col-6">
                    <ConnectedSocialFollowing
                      getFollowers={this.props.fetchFollowers}
                      userName={this.props.match.params.username}
                      followers={followers}
                    />
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <hr size="30" />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h3 className="text-center"> Favorites </h3>
            <Card />
          </div>
          <div className="col-6">
            <h3 className="text-center"> Bookmarks </h3>
            <Bookmarks />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profileprops: state.profile,
});

const mapDispatchToProps = dispatch => ({
  fetchFollows: currentUserProf => dispatch(fetchFollows(currentUserProf)),
  fetchFollowers: currentUserProf => dispatch(fetchFollowers(currentUserProf)),
  fetchBio: currentUserProf => dispatch(fetchBio(currentUserProf)),
  fetchName: currentUserProf => dispatch(fetchName(currentUserProf)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
