import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom'
import MockAdapter from 'axios-mock-adapter';
import { shallow , mount } from '../../enzyme';
import NotificationList from '../../../containers/notifications/NotificationList';

const url = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/';
const mockSuccessResponse = {
    notifications: [
        {
            'body': '@yundo created an article',
            'createdAt': '25th-may-2019'
        },
        {
            'body': '@yundo created an article',
            'createdAt': '25th-may-2019'
        },
        {
            'body': '@yundo created an article',
            'createdAt': '25th-may-2019'
        },
         
    ]
};
describe('Test notifications', () => {
    it('should render the notification page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NotificationList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});

describe('should get notifications from the API', () => {
    const spy = jest.spyOn(NotificationList.prototype, 'componentDidMount');
    const wrapper = mount(<NotificationList />);
   
    beforeEach(() => {
      
        const mock = new MockAdapter(Axios);
        mock
        .onGet( url )
        .reply(200, mockSuccessResponse);
    });

    it('should call componentDidmount', () => {
        expect(spy).toHaveBeenCalled();
    })
    it('should update the state with the notifications', () => {
        // const { state } = wrapper.instance()
        // console.log(mockSuccessResponse)
        // expect(state.notifications).toBe(mockSuccessResponse.notifications)
        
        
    } )

})