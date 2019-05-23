/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import CommentHistory from '../commentHistory/CommentHistory';
import { deleteComment, editComment } from '../../store/actions/commentActions';

export class CommentDetail extends React.Component {
  state = {
    body: '',
    isHidden: true,
    historyReveal: false,
    revealEdits: false,
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({
      body: item.body,
    });
  }

  handleDelete = (id) => {
    const { slug, deleteComment } = this.props;
    deleteComment(slug, id);
  };

  handleSubmit = (id) => {
    const { slug, editComment } = this.props;
    editComment(slug, id, this.state);
  };

  handleOpen = () => {
    this.setState({ isHidden: false });
  };

  handleReveal = () => (!this.state.historyReveal
    ? this.setState({ historyReveal: true })
    : this.setState({ historyReveal: false }));

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const userObject = JSON.parse(localStorage.getItem('user'));
    const { item, slug } = this.props;
    const { isHidden, historyReveal, revealEdits } = this.state;
    return (
      <div className="card mb-3 mt-3 mx-auto">
        <div className="card-body">
          <p className="card-text">
            <div
              onMouseOver={() => this.setState({ revealEdits: true })}
              onMouseLeave={() => this.setState({ revealEdits: false })}
            >
              {isHidden ? (
                <div>
                  <div className="d-flex mb-3">
                  <FontAwesomeIcon icon="user" color="#20c997" className="comment-icon mt-1" size="3x"/>
                    <div className="d-flex flex-column bd-highlight mt-2 ml-3">
                      <a href={`/profile/${item.author.username}`}>
                        <small className="bd-highlight">{item.author.username}</small>
                      </a>
                      <small className="bd-highlight text-muted">{item.author.email}</small>
                    </div>
                  </div>
                  <p className="card-text mb-1">{item.body}</p>
                  {historyReveal ? (
                    <CommentHistory slug={slug} id={item.id} user={item.author} />
                  ) : null}
                  <div className="d-flex">
                    {moment(item.createdAt).format() !== moment(item.updatedAt).format() ? (
                      <span onClick={this.handleReveal} className="btn-edit info">
                        {!historyReveal ? 'Edited' : 'Close'}
                      </span>
                    ) : null}
                    <small className="text-muted ml-auto">{moment(item.createdAt).fromNow()}</small>
                  </div>
                  {userObject && userObject.username !== item.author.username ? (
                    <div />
                  ) : !userObject ? (
                    <div />
                  ) : revealEdits ? (
                    <div className="d-flex w-100 card-text">
                      <div className="w-25 m-auto d-flex mt-2">
                        <FontAwesomeIcon icon="edit" color="#33A2FF" className="col edit-icon" onClick={this.handleOpen}>
                          Edit
                        </FontAwesomeIcon>

                        <FontAwesomeIcon
                          className="col trash-icon"
                          icon="trash"
                          color="#E3081C"
                          onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(item.id);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex w-100 card-text">
                      <div className="w-25 m-auto d-flex mt-2">
                        <FontAwesomeIcon
                          icon="edit"
                          className="col text-white"
                        >
                          Edit
                        </FontAwesomeIcon>

                        <FontAwesomeIcon
                          className="col text-white"
                          icon="trash"
                        />
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
                    defaultValue={item.body}
                  />

                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm col-2"
                      onClick={() => this.handleSubmit(item.id)}
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
CommentDetail.propTypes = {
  item: PropTypes.shape({}).isRequired,
  slug: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
};

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
