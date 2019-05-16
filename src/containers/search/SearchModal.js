import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const { results, handleSearch } = props;
  return (
    <div className="modal fade" id="searchModal" tabIndex="-1" role="dialog" aria-labelledby="searchModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <form className="w-100 mb-4" onSubmit={handleSearch}>
              <div className="form-row">
                <div className="col-9">
                  <label className="text-white" htmlFor="searchID">Search</label>
                  <input type="search" name="search" className="form-control" id="searchID" aria-describedby="searchHelp" placeholder="Search here" />
                </div>
                <div className="col-3">
                  <label className="text-white" htmlFor="filterSelectID">Filter by</label>
                  <select className="form-control" name="filter" id="filterSelectID">
                    <option value="all">All</option>
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                  </select>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary mt-2 col-6" id="searchButtonID">Search</button>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-body p-0">
            <h2 className="text-center p-2 w-100 bg-light sticky-top">{`Results: (${results.data.length} found)`}</h2>
            {
              results.status
                ? results.data.map(
                  item => (
                    <div className="card shadow d-flex flex-row mx-4 mb-3" key="{item.id}">
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
};

Modal.propTypes = {
  results: PropTypes.shape({}).isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Modal;
