import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types';
import axios from 'axios';
import { createArticle } from '../../store/actions/articleActions';
import authStatus from '../../helpers/authStatus';
import authHeader from '../../helpers/authHeader';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const KeyCodes = {
  enter: 13,
  space: 32,
};

const delimiters = [KeyCodes.enter, KeyCodes.enter];

export class CreateArticle extends Component {
  static uploadImageCallBack(file) {
    const config = {
      headers: authHeader(),
    };

    try {
      const url = 'https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/dv85uhrw5/image/upload';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'cczvn3h1');
      return axios.post(url, formData, { config });
    } catch (err) {
      return err;
    }
  }

  state = {
    title: '',
    description: '',
    body: EditorState.createEmpty(),
    is_published: true,
    tags: [],
    error: {},
    message: {},
    redirect: false,
  };


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.handleTagAddition = this.handleTagAddition.bind(this);
    this.handleTagDrag = this.handleTagDrag.bind(this);
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

  handleTagDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleTagAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleTagDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    this.setState({ tags: newTags });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
    try {
      document.getElementById('title').classList.remove('is-invalid');
      document.getElementById('description').classList.remove('is-invalid');
    } catch (e) {}
  }

  handleSubmit(e) {
    e.preventDefault();
    // check if body,title or description are empty and prevent submit
    const { body, tags } = this.state;
    const content = convertToRaw(body.getCurrentContent());
    const contentTextLength = content.blocks[0].text.length;
    const title = e.target.title.value;
    const description = e.target.description.value;
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

    let newTags = [];
    tags.map(tag => newTags.push(tag.text));

    const newArticle = {
      title: this.state.title,
      description: this.state.description,
      body: draftToHtml(content),
      is_published: this.state.is_published,
      tags: newTags,
    };
    this.props.createArticle(newArticle);
  }

  render() {
    if (authStatus() === false) {
      this.props.history.push('/');
    }
    const { body, redirect, tags } = this.state;
    const { message } = this.props;

    // Redirect the user to the article after it has been created
    if (redirect && message && message.success) {
      const articleUrl = `/articles/${this.props.message.article.slug}`;
      this.props.history.push(articleUrl);
    }

    let bodyMessage = '';

    const content = convertToRaw(body.getCurrentContent());
    const contentTextLength = content.blocks[0].text.length;
    const minimumLength = 10;
    if (contentTextLength < minimumLength && contentTextLength > 0) {
      bodyMessage = `A minimum of ${minimumLength - contentTextLength} characters is required to publish`;
    }
    if (contentTextLength >= minimumLength) {
      bodyMessage = `${contentTextLength} characters`;
    }

    const editorStyle = {
      padding: '5px',
      fontSize: '18px',
      minHeight: '250px',
      width: '100%',
      borderTop: 'solid 0.5px rgba(0,0,0,0.1)',
      borderBottom: 'solid 0.5px rgba(0,0,0,0.1)',
    };

    return (
      <div className="container">
        <form id="articleForm" onSubmit={this.handleSubmit} className="white">
          <h5 className="text-center mt-3">Create Article</h5>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" autoComplete="off" name="title" className="form-control" onChange={this.handleChange} />
            <div className="invalid-feedback" id="title-text" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" maxLength="128" id="description" autoComplete="off" name="description" onChange={this.handleChange} className="form-control" />
            <div className="invalid-feedback" id="description-text" />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <div>
              <ReactTags
                tags={tags}
                handleDelete={this.handleTagDelete}
                handleAddition={this.handleTagAddition}
                handleDrag={this.handleTagDrag}
                delimiters={delimiters}
              />
            </div>
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
              options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'image', 'remove', 'colorPicker', 'history'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
              },
              fontSize: {
                options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
              },
              image: {
                uploadCallback: CreateArticle.uploadImageCallBack,
                className: 'detail-image',
                alignmentEnabled: false,
                previewImage: true,
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                alt: {
                  present: true,
                  mandatory: true,
                },
                defaultSize: {
                  height: '100%',
                  width: '95%',
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
            <button type="submit" className="btn btn-primary mt-3">Publish Article</button>
          </div>
        </form>
      </div>
    );
  }
}

CreateArticle.propTypes = {
  errors: PropTypes.shape({}),
  message: PropTypes.shape({}),
  createArticle: PropTypes.func,
};
CreateArticle.defaultProps = {
  errors: {},
  message: {},
  createArticle: () => {},
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  errors: state.articles.error,
  message: state.articles.message,
});

export default connect(mapStateToProps, { createArticle })(CreateArticle);
