/* eslint-disable no-lone-blocks */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../store/actions/commentActions';

class CreateComment extends Component {
  state = {
    body: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    this.props.createComment(this.props.slug, this.state);
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const userObject = JSON.parse(localStorage.getItem('user'));
    {
      return userObject && userObject.token ? (
        <form onSubmit={this.handleSubmit} className="mb-5 comment">
          <div className="form-group">
            <label className="form-label">Comment</label>
            <textarea rows="5" onChange={this.handleChange} name="body" className="form-control" />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary mt-3">
              Comment
            </button>
          </div>
        </form>
      ) : (
        <div />
      );
    }
  }
}

export const mapStateToProps = state => ({
  comments: state.comments,
});

export const mapDispatchToProps = dispatch => ({
  createComment: (slug, comment) => {
    dispatch(createComment(slug, comment));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateComment);
