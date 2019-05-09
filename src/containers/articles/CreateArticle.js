import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { createArticle } from '../../store/actions/articleActions';
import authStatus from '../../helpers/authStatus';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class CreateArticle extends Component {
  state = {
    title: '',
    description: '',
    body: EditorState.createEmpty(),
    is_published: true,
    tags: [],
    error: '',
    message: {},
    redirect: false
  };


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(body) {
    this.setState({
      body,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.error !== nextProps.errors) {
      return {
        error: nextProps.errors,
      };
    }
    return null;
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // check if body,title or description are empty and prevent submit
    const content = convertToRaw(this.state.body.getCurrentContent());
    const contentTextLength = content.blocks[0].text.length;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    document.getElementById('title').classList.remove('is-invalid');
    document.getElementById('description').classList.remove('is-invalid');

    if (title.length === 0) {
      document.getElementById('title').classList.add('is-invalid');
      document.getElementById('title-text').innerText = 'This field may not be empty.';
      return;
    }
    if (description.length === 0) {
      document.getElementById('description').classList.add('is-invalid');
      document.getElementById('description-text').innerText = 'This field may not be empty.';
      return;
    }

    if (contentTextLength < 10) {
      return;
    }

    this.setState(
      prevState => (
        { ...prevState, redirect: !prevState.redirect }
      ),
    );
    const newArticle = {
      title: this.state.title,
      description: this.state.description,
      body: draftToHtml(content),
      is_published: this.state.is_published,
      tags: this.state.tags,
    };
    this.props.createArticle(newArticle);
  }

  render() {
    if (authStatus() === false) {
      this.props.history.push('/');
    }
    const { body } = this.state;
    const { message } = this.props;
    // Redirect the user to the article after it has been created
    if (this.state.redirect) {
      if (message && message.success) {
        const articleUrl = `/articles/${this.props.message.article.slug}`;
        this.props.history.push(articleUrl);
      }
    }

    const { titleError, descriptionError } = this.props;
    let bodyMessage = '';

    const content = convertToRaw(this.state.body.getCurrentContent());
    const contentTextLength = content.blocks[0].text.length;
    const minimumLength = 10;
    if (contentTextLength < minimumLength && contentTextLength > 0) {
      bodyMessage = `A minimum of ${minimumLength - contentTextLength} characters is required to publish`;
    }
    if (contentTextLength >= minimumLength) {
      bodyMessage = `${contentTextLength} characters`;
    }
    if (titleError) {
      document.getElementById('title').classList.add('is-invalid');
    }
    if (descriptionError) {
      document.getElementById('description').classList.add('is-invalid');
    }
    const editorStyle = {
      padding: '5px',
      fontSize: '18px',
      minHeight: '250px',
      width: '100%',
    };

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="text-center mt-3">Create Article</h5>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" autoComplete="off" className="form-control" onChange={this.handleChange} />
            <div className="invalid-feedback" id="title-text">
              {titleError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" maxLength="128" id="description" autoComplete="off" onChange={this.handleChange} className="form-control" />
            <div className="invalid-feedback" id="description-text">
              {descriptionError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input className="form-control" autoComplete="off" type="text" id="tags" />
          </div>
          <Editor
            initialEditorState={body}
            placeholder="Start inspiring the world with your words..."
            toolbarClassName="toolbarClassName"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorStyle={editorStyle}
            onEditorStateChange={this.onEditorStateChange}
            hashtag={{
              separator: ' ',
              trigger: '#',
            }}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'colorPicker', 'history'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
              },
              image: {
                uploadCallback: this.uploadImageCallBack,
                previewImage: true,
                alt: {
                  present: true,
                  mandatory: true,
                },
              },
            }}
          />
          { contentTextLength < minimumLength && contentTextLength > 0 ? (
            (
              <div className="alert alert-dark text-muted">
                {bodyMessage}
              </div>
            )
          ) : (
            <span className="badge badge-pill badge-dark">{bodyMessage}</span>
          )}
          <div className="form-group text-center">
            <button type="submit" className="btn btn-secondary mt-3">Publish Article</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    errors: state.articles.error,
    titleError: state.articles.titleError,
    descriptionError: state.articles.descriptionError,
    message: state.articles.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createArticle: article => dispatch(createArticle(article)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
