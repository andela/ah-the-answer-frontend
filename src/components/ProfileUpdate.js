import { connect } from 'react-redux';
import React, { Component } from 'react';
import { updateFollows, updateFollowers, updateBio, updateName } from '../actions/profileActions';
import ProfileUpdateForm from './ProfileUpdateForm';

class ProfileUpdate extends Component {
  componentDidMount() {
    this.props.updateName();
    this.props.updateBio();
  }

  render() {
    const {profileprops: {profile: { userName }}} = this.props;
    const {profileprops: {profile: { bio }}} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>
            Navbar Placeholder
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-3" />
          <div className="col-4">
            <ProfileUpdateForm
              name={userName}
              bio={bio}
            />
          </div>
          <div className="col-3">
            <img src="..." className="img-fluid" alt="Placholder" />
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
    updateName: () => dispatch(updateName()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
