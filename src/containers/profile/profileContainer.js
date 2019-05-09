/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateFollows, updateFollowers, updateBio, updateName } from '../../actions/profileActions';
import Card from '../../components/Card';
import ButtonBadge from '../../components/ButtonBadge';
import BiographyText from '../../components/BiographyText';
import NameTag from '../../components/NameTag';

class ProfileView extends Component {
  render() {
    const {profileprops: {profile: { follows }}} = this.props;
    const {profileprops: {profile: { followers }}} = this.props;
    const {profileprops: {profile: { bio }}} = this.props;
    const {profileprops: {profile: { userName }}} = this.props;
    const {profileprops: {profile: { givenName }}} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <img src="..." className="img-fluid" alt="Placholder" />
          </div>
          <div className="col-sm-6">
            <div className="row">
              <NameTag
                firstName={givenName}
                secondName={userName}
                textUpdateMethod={this.props.updateName}
              />
            </div>
            <div className="row">
              <BiographyText
                text={bio}
                textUpdateMethod={this.props.updateBio}
              />
              <Link to="/user/editprofile">Edit Bio</Link>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <ButtonBadge
                  buttonName="Follows"
                  badgeNumber={follows}
                  badgeUpdateMethod={this.props.updateFollows}
                />
              </div>
              <div className="col-sm-6">
                <ButtonBadge
                  buttonName="Followers"
                  badgeNumber={followers}
                  badgeUpdateMethod={this.props.updateFollowers}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <hr size="30" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Card />
          </div>
          <div className="col-sm-6">
            <Card />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    profileprops: state,
  }
);

const mapDispatchToProps = dispatch => ({
  updateFollows: () => dispatch(updateFollows()),
  updateFollowers: () => dispatch(updateFollowers()),
  updateBio: () => dispatch(updateBio()),
  updateName: () => dispatch(updateName()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
