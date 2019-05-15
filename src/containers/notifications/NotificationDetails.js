import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const url = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/';
const config = {
  headers: authHeader(),
};
class NotificationDetails extends Component {
    state = {
      notifications: {},

    }

    componentDidMount() {
      const { id } = this.props.match.params;
      axios.get(`${url}${id}/`, config)
        .then((res) => {
          const { notifications } = res.data;
          this.setState({ notifications });
        });
    }

    render() {
      const { notifications } = this.state;
      return (
        <div className="container article-details">
          <div className="row">
            <div className="col-lg-4 mt-4">
              <div className="row">
                <div className="col-lg-9">
                  <div className="text-muted">{moment(notifications.CreatedAt).calendar()}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid container-width">
            <div className="lead">{notifications.body}</div>
          </div>
        </div>
      );
    }
}

export default NotificationDetails;
