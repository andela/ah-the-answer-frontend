import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteArticle } from '../../store/actions/articleActions';

class ConfirmDelete extends Component {
  handleClick = () => {
    this.props.deleteArticle(this.props.slug);
  }

  render() {
    const message = this.props.message;
    if (message) {
      return <Redirect to="/" />
    }
    if (message && message === 'The article requested does not exist'){
      return <Redirect to="/" />
    }
    return (
      <div>
        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteModal">
          <i className="fas fa-trash" />
        </button>
        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Delete Article</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this article?
                { message ? (
                    (
                      <div className="alert alert-success text-muted">
                        {message}
                      </div>
                    )
                  ) : (
                    null
                  )}                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={this.handleClick}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.articles.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteArticle: slug => dispatch(deleteArticle(slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDelete);
