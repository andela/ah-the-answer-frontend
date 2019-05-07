/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { updateFollows } from '../../actions/profileActions';
import Card from '../../components/Card';
import ButtonBadge from '../../components/ButtonBadge';

class ProfileView extends Component {
  render() {
    const {profileprops: {profile: { follows }}} = this.props;

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
              badgeUpdateMethod={this.props.updateFollows}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateFollows: () => dispatch(updateFollows()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
