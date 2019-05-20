import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ConnectedSocialFollowing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      followers: 0,
    };
  }

  componentDidMount() {
    this.setState({ followers: this.props.followers });
  }

  componentWillReceiveProps(nextProps) {
    // this.props.getFollowers(this.props.userName);
    this.setState({ followers: nextProps.profileprops.followers });
  }

  render() {
    const { followers } = this.state;
    return (
      <div className="container">
        <p className="text-center">{followers || 0} followers</p>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  profileprops: state.profile,
});

export default connect(mapStateToProps)(ConnectedSocialFollowing);