/* eslint-disable no-tabs */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFollowings } from '../../store/actions/followActions';


export class FollowedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followings: [],
    };
  }

  componentDidMount() {
    const {
      getFollowings,
    } = this.props;
    getFollowings();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.followings !== nextProps.followings) {
      return {
        followings: nextProps.followings,
      };
    }
    return null;
  }

  render() {
    const {
      followings,
    } = this.state;
    return (
      <div className="home container-fluid p-0">
        <div className="container-fluid d-flex px-5 py-3">
          <div className="col-lg-8 col-md-8 col-sm-12 p-0">
            <h2 className="text-center mb-4 sticky-top bg-white p-2">Users You Follow</h2>
            <ul className="list-group list-group-flush">
              { followings && followings.map((following) => {
                return (
                  <Link to={`/profile/${following.followed_user}`}>
                    <li className="list-group-item">{following.followed_user}</li>
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
  followings: state.follows.followings,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFollowings: () => dispatch(getFollowings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowedUsers);
