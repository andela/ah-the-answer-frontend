import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  fetchBio, fetchName, updateProfile, resetProfileUpdate,
} from '../../store/actions/profileActions';
import ProfileUpdateForm from './components/ProfileUpdateForm';

export class ProfileUpdate extends Component {
  componentDidMount() {
    this.props.fetchName();
    this.props.fetchBio();
  }

  render() {
    const { profileprops: { givenName } } = this.props;
    const { profileprops: { bio } } = this.props;
    const { profileprops: { updateMessage } } = this.props;
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
              updateMessage={updateMessage}
              updateProfile={this.props.updateProfile}
              resetUpdate={this.props.resetProfileUpdate}
            />
          </div>
          <div className="col-3">
            <img src="https://res.cloudinary.com/apibucket/image/upload/v1554188102/sample.jpg" className="img-fluid" alt="Placholder" />
            <form>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Change Profile Image</label>
                <input type="file" className="form-control-file" id="updateImage" />
              </div>
            </form>
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
  fetchBio: () => dispatch(fetchBio()),
  fetchName: () => dispatch(fetchName()),
  updateProfile: (name, bio) => dispatch(updateProfile(name, bio)),
  resetProfileUpdate: () => dispatch(resetProfileUpdate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
