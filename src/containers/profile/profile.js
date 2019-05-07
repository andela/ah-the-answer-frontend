/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as ProfileActionCreators from '../../actions/profile';
import Card from '../../components/Card';
import ButtonBadge from '../../components/ButtonBadge';

class ProfileView extends Component {
  render() {
    const { dispatch } = this.props;
    const {profileprops: {profile: { follows }}} = this.props;
    const updateFollows = bindActionCreators(ProfileActionCreators.updateFollows, dispatch);
    const updateFollowers = bindActionCreators(ProfileActionCreators.updateFollowers, dispatch);

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <img src="..." className="img-fluid" alt="Placholder" />
          </div>
          <div className="col-sm-6">
            <h3> USERNAME </h3>
            <p> USER BIO </p>
            <ButtonBadge
              buttonName="Follows"
              badgeNumber={follows}
              updateFollows={updateFollows}
            />
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

export default connect(mapStateToProps)(ProfileView);
