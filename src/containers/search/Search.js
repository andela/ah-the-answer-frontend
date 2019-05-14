import React, { Component } from 'react';
import Axios from 'axios';
import Modal from './SearchModal';

export default class Search extends Component {
  state = {
    results: {
      query: 'Enter a string to begin searching',
      status: false,
      data: [],
      loading: false,
    },
  }

  handleSearch = (e) => {
    e.preventDefault();
    let url;
    const queryEntered = e.target.search.value;
    const filter = e.target.filter.value;

    switch (filter) {
      case 'author':
        url = `https://ah-the-answer-backend-staging.herokuapp.com/api/articles/?author=${queryEntered}`;
        break;
      case 'title':
        url = `https://ah-the-answer-backend-staging.herokuapp.com/api/articles/?title=${queryEntered}`;
        break;
      default:
        url = `https://ah-the-answer-backend-staging.herokuapp.com/api/articles/?search=${queryEntered}`;
    }

    return this.sendRequest(url, queryEntered);
  }

  sendRequest = (url, queryEntered) => {
    const res = Axios.get(url);
    res.then(
      (response) => {
        if (response.data.articles.length > 0) {
          this.setState({
            results: {
              query: queryEntered,
              status: true,
              data: response.data.articles,
            },
          });
        } else {
          this.setState({
            results: {
              query: `No results found for "${queryEntered}"`,
              status: false,
              data: [],
            },
          });
        }
      },
    );
  }

  render() {
    const { results } = this.state;
    return (
      <Modal
        results={results}
        handleSearch={this.handleSearch}
      />
    );
  }
}
