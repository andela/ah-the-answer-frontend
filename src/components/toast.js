import React from 'react';
import PropTypes from 'prop-types';

const Toast = (props) => {
  const { name } = props;
  return (
    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="mr-auto">Bootstrap</strong>
        <small>11 mins ago</small>
        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">
        {name}
      </div>
    </div>
  );
};
export default Toast;

Toast.defaultProps = {
  name: '',
};

Toast.propTypes = {
  name: PropTypes.string,
};
