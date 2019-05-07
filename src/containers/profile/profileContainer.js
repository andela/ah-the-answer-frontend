/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { updateFollows, updateFollowers, updateBio } from '../../actions/profileActions';
import Card from '../../components/Card';
import ButtonBadge from '../../components/ButtonBadge';
import BiographyText from '../../components/BiographyText';

class ProfileView extends Component {
  render() {
    const {profileprops: {profile: { follows }}} = this.props;
    const {profileprops: {profile: { followers }}} = this.props;
    const {profileprops: {profile: { bio }}} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <img src="..." className="img-fluid" alt="Placholder" />
          </div>
          <div className="col-sm-6">
            <div className="row">
              <h4> USERNAME </h4>
            </div>
            <div className="row">
              <BiographyText
                text={bio}
                textUpdateMethod={this.props.updateBio}
              />
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateFollows: () => dispatch(updateFollows()),
    updateFollowers: () => dispatch(updateFollowers()),
    updateBio: () => dispatch(updateBio()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
