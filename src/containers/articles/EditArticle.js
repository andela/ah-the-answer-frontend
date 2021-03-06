import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import authStatus from '../../helpers/authStatus';
import isOwner from '../../helpers/isOwner';
import authHeader from '../../helpers/authHeader';
import { updateArticle, getArticle, deleteArticle } from '../../store/actions/articleActions';

const KeyCodes = {
  enter: 13,
  space: 32,
};

const delimiters = [KeyCodes.enter, KeyCodes.enter];

export class EditArticle extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: EditorState.createEmpty(),
      is_published: true,
      tags: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.handleTagAddition = this.handleTagAddition.bind(this);
    this.handleTagDrag = this.handleTagDrag.bind(this);
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getArticle(slug);
  }

  componentWillReceiveProps(nextProps) {
    try {
      const articles = [];
      articles.push(nextProps.article);
      const article = articles[0];
      const articleBody = article.body;
      const contentBlock = htmlToDraft(articleBody);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const body = EditorState.createWithContent(contentState);
      
      const newTags = [];

      for (let i = 0; i < article.tags.length; i++) {
        const obj = { id: 'i', text: article.tags[i] };
        newTags.push(obj);
      }

      this.setState({
        title: article.title,
        description: article.description,
        body,
        tags: newTags,
        is_published: true,
      });
    } catch (e) {}
  }

  onEditorStateChange(body) {
    this.setState({
      body,
    });
  }

  handleClick = () => {
    this.props.deleteArticle(this.props.match.params.slug);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
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

  handleSubmit(e) {
    e.preventDefault();
    try {
      document.getElementById('title').classList.remove('is-invalid');
      document.getElementById('description').classList.remove('is-invalid');
    } catch (e) {}
    const { body, tags } = this.state;
    // check if body is empty and prevent submit
    const content = convertToRaw(body.getCurrentContent());
    const contentTextLength = content.blocks[0].text.length;
    if (contentTextLength < 10) {
      document.getElementById('body-text').innerText = 'Start inspiring the world with your words...';
      return;
    }
    const slug = this.props.match.params.slug;
    let newTags = [];
    tags.map(tag => newTags.push(tag.text));
    const updatedArticle = {
      title: this.state.title,
      description: this.state.description,
      body: draftToHtml(content),
      is_published: this.state.is_published,
      tags: newTags,
    };
    this.props.updateArticle(slug, updatedArticle);
  }

  render() {
    // Prevent a user who is not logged in from accessing this page
    if (authStatus() === false) {
      this.props.history.push('/');
    }

    const author = this.props.article.author;
    const urlSlug = this.props.match.params.slug;
    const articleUrl = `/articles/${urlSlug}`;

    const article = this.state;
    const { body, tags } = this.state;
    const { editMessage, deleteMessage, message } = this.props;

    const { errors } = this.props;
    let bodyMessage = '';

    const content = convertToRaw(body.getCurrentContent());
    const contentTextLength = content.blocks[0].text.length;
    const minimumLength = 10;
    const editorStyle = {
      padding: '5px',
      fontSize: '18px',
      minHeight: '250px',
      width: '100%',
      borderTop: 'solid 0.5px rgba(0,0,0,0.1)',
      borderBottom: 'solid 0.5px rgba(0,0,0,0.1)',
    };

    if (contentTextLength < minimumLength) {
      bodyMessage = `A minimum of ${minimumLength - contentTextLength} characters is required to publish`;
    }
    if (contentTextLength >= minimumLength) {
      bodyMessage = `${contentTextLength} characters`;
    }
    if (errors.errors && errors.errors.title) {
      document.getElementById('title').classList.add('is-invalid');
      document.getElementById('title-text').innerText = errors.errors.title;
    }
    if (errors.errors && errors.errors.description) {
      document.getElementById('description').classList.add('is-invalid');
      document.getElementById('description-text').innerText = errors.errors.description;
    }
    // Check if token is invalid and redirect user to homepage
    // if (errors && errors.detail) {
    //   this.props.history.push('/');
    // }

    // Functionality to redirect page to new url when title is updated and slug changes
    if (editMessage && editMessage.article) {
      const updatedSlug = editMessage.article.slug;
      const newUrl = `/articles/${updatedSlug}/edit`;

      if (updatedSlug !== urlSlug) {
        this.props.history.push(newUrl);
      }
    }
    // Functionality to redirect on deletion
    if (deleteMessage && deleteMessage.message) {
      this.props.history.push('/');
    }
    // Functionality to redirect to homepage when a user tries to access a non-existent article
    if (message && message === 'The article requested does not exist') {
      this.props.history.push('/');
    }

    return (
      <div className="container">
        {
          author && author.username && isOwner(author.username) ? (
            <div>
              <div className="row float-right mt-1">
                <div>
                  <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#deleteModal">
                    <i className="fas fa-trash" />
                    <span className="ml-1">Delete</span>
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
                        </div>
                        <div className="modal-footer">
                          <button id="delete" type="button" className="btn btn-danger" onClick={this.handleClick} data-dismiss="modal">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={this.handleSubmit} className="white">
                <h5 className="text-center mt-3">Edit Article</h5>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" autoComplete="off" className="form-control" onChange={this.handleChange} value={article.title} />
                  <div className="invalid-feedback" id="title-text" />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" maxLength="128" id="description" autoComplete="off" onChange={this.handleChange} className="form-control" value={article.description} />
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
                  editorState={body}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                  editorStyle={editorStyle}
                  hashtag={{
                    separator: ' ',
                    trigger: '#',
                  }}
                  toolbar={{
                    options: ['inline', 'blockType', 'list', 'fontSize', 'textAlign', 'link', 'image', 'remove', 'colorPicker', 'history'],
                    inline: {
                      options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                    },
                    fontSize: {
                      options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
                    },
                    image: {
                      uploadCallback: EditArticle.uploadImageCallBack,
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
                { contentTextLength < minimumLength ? (
                  (
                    <div className="alert alert-dark text-muted" id="body-text">
                      {bodyMessage}
                    </div>
                  )
                ) : (
                  <span className="badge badge-pill badge-dark">{bodyMessage}</span>
                )}
                {
                  editMessage && editMessage.success ? (
                    <div className="alert alert-success text-muted mt-3">
                      {editMessage.success}
                    </div>
                  ) : (
                    null
                  )
                }
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary mt-3">Update Article</button>
                </div>
              </form>
            </div>
          ) : (
            this.props.history.push(articleUrl)
          )
        }

      </div>
    );
  }
}

EditArticle.propTypes = {
  article: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  message: PropTypes.shape({}),
  editMessage: PropTypes.shape({}),
  deleteMessage: PropTypes.shape({}),
};
EditArticle.defaultProps = {
  article: {},
  errors: {},
  message: {},
  editMessage: {},
  deleteMessage: {},
};

const mapStateToProps = state => ({
  article: state.articles.article,
  errors: state.articles.error,
  editMessage: state.articles.editMessage,
  message: state.articles.message,
  deleteMessage: state.articles.deleteMessage,
});

const mapDispatchToProps = dispatch => ({
  updateArticle: (slug, article) => dispatch(updateArticle(slug, article)),
  getArticle: slug => dispatch(getArticle(slug)),
  deleteArticle: slug => dispatch(deleteArticle(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
