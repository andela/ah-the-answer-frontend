import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authHeader from '../../helpers/authHeader';
import NotificationSummary from './NotificationSummary';


const url = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/';
const readUrl = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/read-all';
const config = {
  headers: authHeader(),

};

class NotificationList extends Component {
    state = {
      notifications: [],
    }

    componentDidMount() {
      axios.get(url, config)
        .then((res) => {
          const { notifications } = res.data;

          this.setState({ notifications });
        });
      axios.put(readUrl, {}, config)
        .then(() => {
        });
    }

    render() {
      const { notifications } = this.state;
      if (notifications < 1) {
        return (
          <div className="container" data-test="articleListNone">
            <div className="d-flex justify-content-center">
              <p className="text-muted mt-1 ml-1">You have no notifications</p>
            </div>
          </div>
        );
      }
      return (
        <div className="list-group container p-4">
          { notifications.map(notification => (
            <NotificationSummary notification={notification} />
          )) }
        </div>

      );
    }
}

export default NotificationList;
