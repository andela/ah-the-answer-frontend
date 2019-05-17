/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteComment, editComment } from '../../store/actions/commentActions';

export class CommentDetail extends React.Component {
  state = {
    body: '',
    isHidden: true,
  };

  componentDidMount() {
    this.setState({
      body: this.props.item.body,
    });
  }

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
      <div className="card mb-3 mt-3 mx-auto">
        <div className="card-body">
          <p className="card-text">
            <div>
              {this.state.isHidden ? (
                <div>
                  <p className="card-text">{this.props.item.body}</p>
                  <div className="d-flex">
                    <small className="text-muted ml-auto">
                      {moment(this.props.item.createdAt).fromNow()}
                    </small>
                  </div>
                  {userObject && userObject.username !== this.props.item.author.username ? (
                    <div />
                  ) : !userObject ? (
                    <div />
                  ) : (
                    <div className="d-flex w-100 card-text">
                      <div className="w-25 mr-auto d-flex align-items-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm col mr-2"
                          onClick={this.handleOpen}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger col btn-sm"
                          onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(this.props.item.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="m-2">
                  <label className="form-label">Update Comment</label>
                  <textarea
                    name="body"
                    rows="5"
                    onChange={this.handleChange}
                    className="form-control edit-comment"
                    defaultValue={this.props.item.body}
                  />

                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm col-2"
                      onClick={() => this.handleSubmit(this.props.item.id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </p>
        </div>
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
