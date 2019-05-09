import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  fetchFollows, fetchFollowers, fetchBio, fetchName,
} from '../../store/actions/profileActions';
import ProfileUpdateForm from './components/ProfileUpdateForm';

class ProfileUpdate extends Component {
  componentDidMount() {
    this.props.fetchName();
    this.props.fetchBio();
  }

  render() {
    const { profileprops: { profile: { givenName } } } = this.props;
    const { profileprops: { profile: { bio } } } = this.props;
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
              name={givenName}
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

const mapDispatchToProps = dispatch => ({
  fetchFollows: () => dispatch(fetchFollows()),
  fetchFollowers: () => dispatch(fetchFollowers()),
  fetchBio: () => dispatch(fetchBio()),
  fetchName: () => dispatch(fetchName()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
