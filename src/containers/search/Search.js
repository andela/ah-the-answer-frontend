import React, { Component } from 'react';
import Axios from 'axios';

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

    const res = Axios.get(
      url,
    );
    res.then(
      (response) => {
        const articlesFound = response.data.articles;
        if (articlesFound.length > 0) {
          this.setState(
            {
              results: {
                query: queryEntered,
                status: true,
                data: response.data.articles,
              },
            },
          );
        } else {
          this.setState(
            {
              results: {
                query: `No results found for "${queryEntered}"`,
                status: false,
                data: [],
              },
            },
          );
        }
      },
    );
  }

  render() {
    const { results } = this.state;
    return (
      <div className="modal fade" id="searchModal" tabIndex="-1" role="dialog" aria-labelledby="searchModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <form className="w-100 mb-4" onSubmit={this.handleSearch}>
                <div className="form-row">
                  <div className="col-9">
                    <label className="text-white" for="searchID">Search</label>
                    <input
                      type="search"
                      name="search"
                      className="form-control"
                      id="searchID"
                      aria-describedby="searchHelp"
                      placeholder="Search here"
                    />
                  </div>
                  <div className="col-3">
                    <label className="text-white" for="filterSelectID">Filter by</label>
                    <select className="form-control" name="filter" id="filterSelectID">
                      <option value="all" selected>All</option>
                      <option value="author">Author</option>
                      <option value="title">Title</option>
                    </select>
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary mt-2 col-6">Search</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-body p-0">
              <h2 className="text-center p-2 w-100 bg-light sticky-top">Results ({results.data.length} found)</h2>
              {
                results.status
                  ? results.data.map(
                    item => (
                      <div className="card shadow d-flex flex-row mx-4 mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">{item.description}</h6>
                          <a href={`/articles/${item.slug}`} className="card-link">Go to article</a>
                        </div>
                      </div>
                    ),
                  )
                  : <p className="display-5 p-4 text-center text-muted">{results.query}</p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
