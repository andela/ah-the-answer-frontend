import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom'
import MockAdapter from 'axios-mock-adapter';
import { shallow } from '../../enzyme';
import NotificationList from '../../../containers/notifications/NotificationList';

describe('Test notifications', () => {
    it('should render the notification page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NotificationList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});

