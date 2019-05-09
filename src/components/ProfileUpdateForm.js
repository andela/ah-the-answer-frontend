import React, { Component } from 'react';

class ProfileUpdateForm extends Component {
  state = {
    name: '',
    bio: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name, bio: nextProps.bio });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <input type="text" className="form-control" id="editName" defaultValue={this.state.name} />
          <small id="userNameHelp" className="form-text text-muted"> Edit Your Name</small>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="editBio" defaultValue={this.state.bio} />
          <small id="userNameHelp" className="form-text text-muted"> Edit Your Bio</small>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    );
  }
}

export default ProfileUpdateForm;
