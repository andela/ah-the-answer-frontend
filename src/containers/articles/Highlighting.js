import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import authHeader from '../../helpers/authHeader';
import authStatus from '../../helpers/authStatus';

const highlightUrl = process.env.REACT_APP_API;

export default class Highlighting extends Component {
  state = {
    highlightedText: '',
    start: '',
    end: '',
    highlightComment: '',
  };

  onChange = (e) => {
    this.setState({ highlightComment: e.target.value });
  };

  closeWindow = () => {
    document.getElementById('highlightMessage').style.display = 'none';
  };

  createHighlight = (e) => {
    e.preventDefault();
    const { renderer } = this.props;
    const { start, end, highlightComment } = this.state;
    const data = {
      highlight: {
        start,
        end,
        comment: highlightComment,
      },
    };

    axios.post(`${highlightUrl}/api/articles/${this.props.slug}/highlight/`, data, { headers: authHeader() })
      .then((res) => {
        if (res.status === 201) {
          document.getElementById('highlightMessage').style.display = 'none';
          const h = {
            start: res.data.highlight.start,
            stop: res.data.highlight.end,
            comment: res.data.highlight.comment,
            index: 1,
            username: res.data.highlight.user.username,
          };
          renderer(h);
        }
      });
  };

  render() {
    const { highlightComment } = this.state;
    if (authStatus() !== false) {
      document.onmouseup = () => {
        let text = (document.getSelection());
        const start = text.baseOffset;
        const stop = text.extentOffset;
        text = text.toString();
        if (text.length > 1) {
          this.setState({ highlightedText: text });
          this.setState({ start });
          this.setState({ end: stop });
          document.getElementById('highlightMessage').style.display = 'block';
        }
      };
    }
    return (
      <div className="highlight-center" id="highlightMessage">
        <form className="form-wrapper p-3 shadow-lg" onSubmit={this.createHighlight}>
          <div className="form-group">
            { this.state.highlightedText }
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="comment(optional)"
              name="highlightComment"
              type="text"
              value={highlightComment}
              onChange={this.onChange}
              onFocus={this.onFocus}
            />
          </div>
          <div className="form-row">
            <div className="form-group mb-1 col-6">
              <button className="form-control btn-primary" type="submit">Submit</button>
            </div>
            <div className="form-group col-6">
              <button className="form-control btn btn-danger" type="button" onClick={this.closeWindow}>Dismiss</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
Highlighting.propTypes = {
  slug: PropTypes.string.isRequired,
  renderer: PropTypes.func.isRequired,
};
