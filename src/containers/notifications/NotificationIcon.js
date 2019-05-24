import React, { Component } from 'react';
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const url = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/unread';
const urlstatus = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/subscription';
const config = {
  headers: authHeader(),
};
class NotificationIcon extends Component {
    state = {
      NotificationsCount: 0,
      isSubscribed: false,
      style: {
        visibility: 'visible',
      },

    }

    componentDidMount() {
      this.checkStatus();
      axios.get(url, config).then((res) => {
        const count = res.data.notifications.length;
        this.setState({
          NotificationsCount: count,
        });
      });
    }

    checkStatus = () => {
      axios.get(urlstatus, config)
        .then((res) => {
          const { status } = res.data.subscription;
          this.setState({ isSubscribed: status });
        });
    }

    handleOnclick = () => {
      this.setState({ style: { visibility: 'collapse' } });

      axios.get(url, config).then((res) => {
        const count = res.data.notifications.length;
        this.setState({
          NotificationsCount: count,
        });
      });
    }


    render() {
      const { style } = this.state;
      const { NotificationsCount } = this.state;
      if (NotificationsCount < 1 || this.state.isSubscribed === false) {
        return (
          <div>
            <a className="button-badge">
              <i className="fa fa-bell notnotif text-dark" />
            </a>
          </div>
        );
      }


      return (
        <div onClick={this.handleOnclick}>
          <a className="button-badge">
            <i className="fa fa-bell text-dark" />
            <span style={style} className="badge alert">{NotificationsCount}</span>
          </a>
        </div>
      );
    }
}

export default NotificationIcon;
