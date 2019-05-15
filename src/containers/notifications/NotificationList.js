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
          //console.log(notifications);

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
              <div className="spinner-grow text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="text-muted mt-1 ml-1">You have no notifications</p>
            </div>
          </div>
        );
      }
      return (
        <div className="article-list section" data-test="articleList">
          { notifications.map(notification => (
            <Link to={`/notifications/${notification.id}`} key={notification.id}>
              <NotificationSummary notification={notification} />
            </Link>
          )) }
        </div>

      );
    }
}

export default NotificationList;
