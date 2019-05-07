import React from 'react';
import { Link } from 'react-router-dom';

const Edit = slug => (
  <Link to={`/articles/${slug.slug}/edit`}>
    <button className="btn btn-info" data-toggle="tooltip" data-placement="bottom" title="Edit Article" type="button">
      <i className="fas fa-edit" />
    </button>
  </Link>

);

export default Edit;
