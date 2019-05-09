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
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id="editNameField" value={userName} />
                <small id="userNameHelp" className="form-text text-muted"> Edit Your Name</small>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
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
