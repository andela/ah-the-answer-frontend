import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticle } from '../../store/actions/articleActions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import authStatus  from '../../helpers/authStatus';
import ConfirmDelete from '../../components/ConfirmDelete';
import { updateArticle } from '../../store/actions/articleActions';

class EditArticle extends Component {
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
    const slug = this.props.match.params.slug;
    const updatedArticle = {
      title: this.state.title,
      description: this.state.description,
      body: this.state.body,
      is_published: this.state.is_published,
      tags: this.state.tags,
    }
    this.props.updateArticle(slug, updatedArticle);
  }
  componentDidMount(){
    let slug = this.props.match.params.slug;
    this.props.getArticle(slug);
  }

  componentWillReceiveProps(nextProps){
    try {
      let articles = []
      articles.push(nextProps.article)
      const article = articles[0]

      this.setState({
        title: article.title,
        description: article.description,
        body: article.body,
        is_published: true,
        tags: [],
      })
    } catch (e) {

    }
  }

  render() {
    const slug = this.props.match.params.slug;
    const article = this.state;
    // console.log(this.state)
    if (authStatus() === true) return <Redirect to="/" />
    return (
      <div className="container">
        <div className="row float-right mt-1">
          <ConfirmDelete slug={slug}/>
        </div>      
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="text-center mt-3">Edit Article</h5>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="form-control" onChange={this.handleChange} value={article.title}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" maxLength="128" id="description"  onChange={this.handleChange} className="form-control" value={article.description}/>
          </div>
          <div className="form-group">
            <label htmlFor="body">Content</label>
            <textarea id="body" onChange={this.handleChange} className="form-control" rows="30" value={article.body}/>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input className="form-control" type="text" id="tags" onChange={this.handleChange} value={article.tags}/>
          </div>        
          <div className="form-group text-center">
            <button className="btn btn-secondary mt-3">Edit Article</button>
          </div>         
        </form>
      </div>
    )
  }
}

EditArticle.propTypes = {
  article: PropTypes.shape({}),
};
EditArticle.defaultProps = {
  article: {},
};

const mapStateToProps = (state) => {
  return {
    article: state.articles.article,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateArticle: (slug, article) => dispatch(updateArticle(slug, article)),
    getArticle: (slug) => dispatch(getArticle(slug)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
