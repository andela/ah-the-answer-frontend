import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { follow, unFollow, checkFollow } from '../../store/actions/followActions';
import { fetchFollowers } from '../../store/actions/profileActions';

export class FollowButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      followStatus: undefined,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.checkFollow(this.props.userName.userName);
    this.props.fetchFollowers(this.props.userName.userName)
  }

  componentWillReceiveProps() {
    this.setState({
      followStatus: this.props.checkFollowResponse,
    });
  }

  handleClick = () => {
    const { follow, unFollow } = this.props;
    const { followStatus } = this.state;
    if (followStatus === true) {
      this.setState(
        { followStatus: false },
      );
      unFollow(this.props.userName.userName);
    } else {
      this.setState(
        { followStatus: true },
      );
      follow(this.props.userName.userName);
    }
  };

  render() {
    const { followStatus } = this.state;
    return (
      <Button onClick={this.handleClick} className="btn btn-primary">
        { followStatus ? 'Unfollow' : 'Follow' }
      </Button>
    );
  }
}

FollowButton.propTypes = {
  follow: PropTypes.func,
  unFollow: PropTypes.func,
  followStatus: PropTypes.bool,
  userName: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({ 
  checkFollowResponse: state.follows.checkfollow,
  userName: ownProps.userName,
});

const mapDispatchToProps = dispatch => ({
  follow: userName => dispatch(follow(userName)),
  unFollow: userName => dispatch(unFollow(userName)),
  checkFollow: userName => dispatch(checkFollow(userName)),
  fetchFollowers: userName => dispatch(fetchFollowers(userName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton)