import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteArticle } from '../store/actions/articleActions';

class ConfirmDelete extends Component {
  handleClick = () => {
    // const slug = this.props.match.params.slug;
    console.log(this.props);
    this.props.deleteArticle(this.props.slug);
  }
  render () {
    return (
      <div>
      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
        <i className="fas fa-trash" />
      </button>
  
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Delete Article</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this article?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={this.handleClick}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteArticle: slug => dispatch(deleteArticle(slug)),
  };
};

export default connect(null, mapDispatchToProps)(ConfirmDelete);
