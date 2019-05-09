/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchFollows, fetchFollowers, fetchBio, fetchName,
} from '../../store/actions/profileActions';
import Card from './components/Card';
import ButtonBadge from './components/ButtonBadge';
import BiographyText from './components/BiographyText';
import NameTag from './components/NameTag';

class ProfileView extends Component {
  componentDidMount() {
    this.props.fetchName();
    this.props.fetchBio();
    this.props.fetchFollows();
    this.props.fetchFollowers();
  }

  render() {
    const { profileprops: { profile: { follows } } } = this.props;
    const { profileprops: { profile: { followers } } } = this.props;
    const { profileprops: { profile: { bio } } } = this.props;
    const { profileprops: { profile: { userName } } } = this.props;
    const { profileprops: { profile: { givenName } } } = this.props;
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
              <div className="col-sm-6">
                <ButtonBadge
                  buttonName="Follows"
                  badgeNumber={follows}
                  badgefetchMethod={this.props.fetchFollows}
                />
              </div>
              <div className="col-sm-6">
                <ButtonBadge
                  buttonName="Followers"
                  badgeNumber={followers}
                  badgefetchMethod={this.props.fetchFollowers}
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
  fetchFollows: () => dispatch(fetchFollows()),
  fetchFollowers: () => dispatch(fetchFollowers()),
  fetchBio: () => dispatch(fetchBio()),
  fetchName: () => dispatch(fetchName()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
