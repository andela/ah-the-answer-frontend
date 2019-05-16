import React, { Component } from 'react';
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const url = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/unread';
const config = {
  headers: authHeader(),
};
class NotificationIcon extends Component {
    state = {
      NotificationsCount: 0,
      style: {
        visibility: 'visible',
      },

    }

    componentDidMount() {
      axios.get(url, config).then((res) => {
        const count = res.data.notifications.length;
        this.setState({
          NotificationsCount: count,
        });
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
      if (NotificationsCount < 1) {
        return (
          <div>
            <a href="#" className="button-badge">
              <i className="fa fa-bell notnotif" />
            </a>

          </div>
        );
      }


      return (
        <div onClick={this.handleOnclick}>
          <a href="#" className="button-badge">
            <i className="fa fa-bell" />
            <span style={style} className="badge alert">{NotificationsCount}</span>
          </a>
        </div>
      );
    }
}

export default NotificationIcon;
