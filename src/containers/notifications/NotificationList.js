import axios from 'axios';
import React, { Component } from 'react';
import authHeader from '../../helpers/authHeader';
import NotificationSummary from './NotificationSummary';
import Toggle from './ToggleSwitch';

const url = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/';
const Readurl = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/read';
const readUrl = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/read-all';
const statusUrl = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/subscription';
const config = {
  headers: authHeader(),

};

class NotificationList extends Component {
    state = {
      notifications: [],
      isSubscribed: null,
    }

    componentDidMount() {
      this.getNotifications();
    }

    getNotifications = () => {
      axios.get(statusUrl, config)
        .then((res) => {
          const { status } = res.data.subscription;
          this.setState({ isSubscribed: status });
          const { isSubscribed } = this.state;
          if (isSubscribed === true) {
            axios.get(url, config)
              .then((r) => {
                const { notifications } = r.data;
                this.setState({ notifications });
              });
            axios.put(readUrl, {}, config);
          } else {
            axios.get(Readurl, config)
              .then((re) => {
                const { notifications } = re.data;
                this.setState({ notifications });
              });
          }
        });
    }

    handleClick = () => {
      this.setState(prevState => ({
        isSubscribed: !prevState.isSubscribed,
      }));
      axios.post(statusUrl, {}, config);
    }

    render() {
      const { notifications } = this.state;
      if (notifications < 1) {
        return (
          <div className="container" data-test="articleListNone">

            <Toggle handleClick={this.handleClick} isSubscribed={this.state.isSubscribed} />
            <div className="d-flex justify-content-center">
              <p className="text-muted mt-1 ml-1">You have no notifications</p>
            </div>
          </div>
        );
      }
      return (
        <div className="list-group container p-4">
          <Toggle handleClick={this.handleClick} isSubscribed={this.state.isSubscribed} />
          { notifications.map(notification => (
            <NotificationSummary notification={notification} />
          )) }
        </div>

      );
    }
}

export default NotificationList;
