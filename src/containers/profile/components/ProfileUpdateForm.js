import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
const setAxios = require('axios');

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.1gC7fqNwCSTYxCQAHvfNmfyb2GhenC6jG0nKLJ-izCM'
setAxios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

class ProfileUpdateForm extends Component {
  state = {
    name: '',
    bio: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name, bio: nextProps.bio });
  }

  updateProfile = (profileName, bio) => {
    axios.put(' http://127.0.0.1:8000/api/profile/Kyppy/edit/', { profile: { name: profileName, user_bio: bio } });
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const { name, bio } = this.state;
    this.updateProfile(name, bio);
    this.props.history.push('');
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleBioChange = (e) => {
    this.setState({
      bio: e.target.value,
    });
  }

  render() {
    console.log(this.props)
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id="editName" defaultValue={this.state.name} onChange={this.handleNameChange} />
          <small id="userNameHelp" className="form-text text-muted"> Edit Your Name</small>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="editBio" defaultValue={this.state.bio} onChange={this.handleBioChange} />
          <small id="userNameHelp" className="form-text text-muted"> Edit Your Bio</small>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    );
  }
}

export default withRouter(ProfileUpdateForm);
