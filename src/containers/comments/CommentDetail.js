/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { deleteComment, editComment } from '../../store/actions/commentActions';

class CommentDetail extends React.Component {
  state = {
    body: '',
    isHidden: true,
  };

  handleDelete = (id) => {
    this.props.deleteComment(this.props.slug, id);
  };

  handleSubmit = (id) => {
    this.props.editComment(this.props.slug, id, this.state);
  };

  handleOpen = (e) => {
    this.setState({ isHidden: false });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const userObject = JSON.parse(localStorage.getItem('user'));
    return (
      <div className="container">
        {this.state.isHidden ? (
          <div className="text-center">
            <p className="container text-center comment">{this.props.item.body}</p>
            {userObject && userObject.user.username !== this.props.item.author.username ? (
              <div />
            ) : !userObject ? (
              <div />
            ) : (
              <div>
                <button type="button" className="badge badge-primary" onClick={this.handleOpen}>
                  Edit Comment
                </button>
                <button
                  type="button"
                  className="badge badge-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(this.props.item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <textarea
              name="body"
              rows="7"
              onChange={this.handleChange}
              className="form-control edit-comment"
            >
              {this.props.item.body}
            </textarea>
            <div className="text-center mt-2">
              <button
                type="button"
                className="badge badge-primary"
                onClick={() => this.handleSubmit(this.props.item.id)}
              >
                Update Comment
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  comments: state.comments,
});
export const mapDispatchToProps = dispatch => ({
  deleteComment: (slug, id) => dispatch(deleteComment(slug, id)),
  editComment: (slug, id, editedComment) => dispatch(editComment(slug, id, editedComment)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentDetail);
