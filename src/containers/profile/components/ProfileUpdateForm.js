import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class ProfileUpdateForm extends Component {
  state = {
    name: '',
    bio: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name, bio: nextProps.bio });
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const { name, bio } = this.state;
    this.props.updateProfile(name, bio);
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleBioChange = (e) => {
    this.setState({
      bio: e.target.value,
    });
  };

  resetUpdate = () => {
    this.props.resetProfileUpdate();
    this.props.history.push('/profile');
  };

  render() {
    const { updateMessage } = this.props;
    if (updateMessage !== false) {
      this.resetUpdate();
    }

    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="editName"
            defaultValue={this.state.name}
            onChange={this.handleNameChange}
          />
          <small id="userNameHelp" className="form-text text-muted">
            {' '}
            Edit Your Name
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="editBio"
            defaultValue={this.state.bio}
            onChange={this.handleBioChange}
          />
          <small id="userNameHelp" className="form-text text-muted">
            {' '}
            Edit Your Bio
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    );
  }
}

export default withRouter(ProfileUpdateForm);
