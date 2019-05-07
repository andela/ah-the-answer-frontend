import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createArticle } from '../../store/actions/articleActions';
import { Redirect } from 'react-router-dom';
import authStatus  from '../../helpers/authStatus';

class CreateArticle extends Component {
  state = {
    title: '',
    description: '',
    body: '',
    is_published: true,
    tags: [],
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createArticle(this.state);
  }

  render() {
    if (authStatus() === true) return <Redirect to="/" />
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="text-center mt-3">Create New Article</h5>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description"  onChange={this.handleChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="body">Content</label>
            <textarea id="body" onChange={this.handleChange} className="form-control" rows="30"/>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input className="form-control" type="text" id="tags" onChange={this.handleChange}/>
          </div>        
          <div className="form-group text-center">
            <button className="btn btn-secondary mt-3">Create Article</button>
          </div>         
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createArticle: (article) => dispatch(createArticle(article))
  }
}

export default connect(null, mapDispatchToProps)(CreateArticle);
