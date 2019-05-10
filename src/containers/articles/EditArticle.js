import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import authStatus from '../../helpers/authStatus';
import { updateArticle, getArticle, deleteArticle } from '../../store/actions/articleActions';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: EditorState.createEmpty(),
      is_published: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
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

      this.setState({
        title: article.title,
        description: article.description,
        body,
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

  handleSubmit(e) {
    e.preventDefault();
    document.getElementById('title').classList.remove('is-invalid');
    document.getElementById('description').classList.remove('is-invalid');
    // check if body is empty and prevent submit
    const content = convertToRaw(this.state.body.getCurrentContent());
    const contentTextLength = content.blocks[0].text.length;
    if (contentTextLength < 10) {
      return;
    }
    const slug = this.props.match.params.slug;
    const updatedArticle = {
      title: this.state.title,
      description: this.state.description,
      body: draftToHtml(convertToRaw(this.state.body.getCurrentContent())),
      is_published: this.state.is_published,
    };
    this.props.updateArticle(slug, updatedArticle);
  }

  render() {
    if (authStatus() === false) {
      this.props.history.push('/');
    }

    const article = this.state;
    const { body } = this.state;
    const { editMessage, deleteMessage, message } = this.props;

    const { titleError, descriptionError } = this.props;
    let bodyMessage = '';

    const content = convertToRaw(this.state.body.getCurrentContent());
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
    if (titleError) {
      document.getElementById('title').classList.add('is-invalid');
    }
    if (descriptionError) {
      document.getElementById('description').classList.add('is-invalid');
    }

    // Functionality to redirect page to new url when title is updated and slug changes
    if (editMessage && editMessage.article) {
      const updatedSlug = editMessage.article.slug;
      const urlSlug = this.props.match.params.slug;
      const articleUrl = `/articles/${updatedSlug}/edit`;

      if (updatedSlug !== urlSlug) {
        this.props.history.push(articleUrl);
      }
    }
    // Function to redirect on deletion
    if (deleteMessage) {
      this.props.history.push('/');
    }
    if (message && message === 'The article requested does not exist') {
      this.props.history.push('/');
    }

    return (
      <div className="container">
        <div className="row float-right mt-1">
          <div>
            <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#deleteModal">
              <i className="fas fa-trash" /> Delete
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
                    <button type="button" className="btn btn-danger" onClick={this.handleClick} data-dismiss="modal">Delete</button>
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
            <div className="invalid-feedback">
              {titleError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" maxLength="128" id="description" autoComplete="off" onChange={this.handleChange} className="form-control" value={article.description} />
            <div className="invalid-feedback">
              {descriptionError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input className="form-control" autoComplete="off" type="text" id="tags" value={article.tags} />
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
              options: ['inline', 'blockType', 'list', 'fontSize', 'textAlign', 'link', 'embedded', 'image', 'remove', 'colorPicker', 'history'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
              },
              fontSize: {
                options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
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
          { contentTextLength < minimumLength ? (
            (
              <div className="alert alert-dark text-muted">
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
    );
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
    errors: state.articles.error,
    titleError: state.articles.titleError,
    descriptionError: state.articles.descriptionError,
    editMessage: state.articles.editMessage,
    message: state.articles.message,
    deleteMessage: state.articles.deleteMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateArticle: (slug, article) => dispatch(updateArticle(slug, article)),
    getArticle: slug => dispatch(getArticle(slug)),
    deleteArticle: slug => dispatch(deleteArticle(slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
