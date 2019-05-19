import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  fetchBio, fetchName, updateProfile, resetProfileUpdate,
} from '../../store/actions/profileActions';
import ProfileUpdateForm from './components/ProfileUpdateForm';
import authUser from '../../helpers/authUser';

export class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenName: 0,
      bio: '',
      updateMessage: '',
    };
  }

  componentDidMount() {
    const {
      fetchName,
      fetchBio,
    } = this.props

    const userData = authUser();
    const userName = userData.username;

    fetchName(userName);
    fetchBio(userName);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.givenName !== nextProps.profileprops.givenName
      || prevState.bio !== nextProps.profileprops.bio
      || prevState.updateMessage !== nextProps.profileprops.updateMessage) {
      return {
        givenName: nextProps.profileprops.givenName,
        bio: nextProps.profileprops.bio,
        updateMessage: nextProps.profileprops.updateMessage,
      };
    }
    return null;
  }

  render() {
    const {
      givenName,
      bio,
      updateMessage,
    } = this.state;

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
              resetProfileUpdate={this.props.resetProfileUpdate}
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
  fetchBio: currentUserProf => dispatch(fetchBio(currentUserProf)),
  fetchName: currentUserProf => dispatch(fetchName(currentUserProf)),
  updateProfile: (name, bio) => dispatch(updateProfile(name, bio)),
  resetProfileUpdate: () => dispatch(resetProfileUpdate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
