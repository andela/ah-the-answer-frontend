/* eslint-disable no-tabs */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFollowers } from '../../store/actions/followActions';


export class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
    };
  }

  componentDidMount() {
    const {
      getFollowers,
    } = this.props;
    getFollowers();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.followers !== nextProps.followers) {
      return {
        followers: nextProps.followers,
      };
    }
    return null;
  }

  render() {
    const {
      followers,
    } = this.state;
    return (
      <div className="home container-fluid p-0">
        <div className="container-fluid d-flex px-5 py-3">
          <div className="col-lg-8 col-md-8 col-sm-12 p-0">
            <h2 className="text-center mb-4 sticky-top bg-white p-2">Followers</h2>
            <ul className="list-group list-group-flush">
              { followers && followers.map((follower) => {
                return (
                  <Link to={`/profile/${follower}`}>
                    <li className="list-group-item">{follower}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  followers: state.follows.followers,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFollowers: () => dispatch(getFollowers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
