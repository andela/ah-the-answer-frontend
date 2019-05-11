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

export class ProfileView extends Component {
  componentDidMount() {
    this.props.fetchName();
    this.props.fetchBio();
    this.props.fetchFollows();
    this.props.fetchFollowers();
  }

  render() {
    const { profileprops: { follows } } = this.props;
    const { profileprops: { followers } } = this.props;
    const { profileprops: { bio } } = this.props;
    const { profileprops: { userName } } = this.props;
    const { profileprops: { givenName } } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img src="https://res.cloudinary.com/apibucket/image/upload/v1554188102/sample.jpg" className="img-fluid" alt="Placholder" />
          </div>
          <div className="col-6">
            <div className="row">
              <NameTag
                firstName={givenName}
                secondName={userName}
                textfetchMethod={this.props.fetchName}
              />
            </div>
            <div className="row">
              <BiographyText
                text={bio}
                textfetchMethod={this.props.fetchBio}
              />
              <Link to="/user/editprofile">Edit Bio</Link>
            </div>
            <div className="row">
              <div className="col-6">
                <SocialFollowing
                  socialName="Follows"
                  number={follows}
                  badgefetchMethod={this.props.fetchFollows}
                />
              </div>
              <div className="col-6">
                <SocialFollowing
                  socialName="Followers"
                  number={followers}
                  badgefetchMethod={this.props.fetchFollowers}
                />
              </div>
            </div>
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
            <Card />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    profileprops: state.profile,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchFollows: () => dispatch(fetchFollows()),
  fetchFollowers: () => dispatch(fetchFollowers()),
  fetchBio: () => dispatch(fetchBio()),
  fetchName: () => dispatch(fetchName()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
