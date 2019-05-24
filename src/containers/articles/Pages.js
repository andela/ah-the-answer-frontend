import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pages extends Component {
  state = {
    active: 1,
  }

  handlePageButtons = () => {
    const { active } = this.state;
    const { articleCount } = this.props;
    let btn = [];
    for (let count = 1; count <= Math.ceil(articleCount / 10); count += 1) {
      btn = [
        ...btn,
        <li className={`page-item ${active === count ? 'disabled' : ''}`} key={count}>
          <button className="page-link" type="button" onClick={() => this.handleChange(count)}>{count}</button>
        </li>,
      ];
    }
    return btn;
  }

  handleChange(page) {
    const { changeOffset } = this.props;
    this.setState({
      active: page,
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    return changeOffset(page);
  }

  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {
            this.handlePageButtons().map(item => item)
          }
        </ul>
      </nav>
    );
  }
}

Pages.propTypes = {
  changeOffset: PropTypes.func.isRequired,
  articleCount: PropTypes.number.isRequired,
};
