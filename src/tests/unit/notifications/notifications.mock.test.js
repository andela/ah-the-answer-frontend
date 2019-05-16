import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom'
import MockAdapter from 'axios-mock-adapter';
import { shallow , mount } from '../../enzyme';
import NotificationList from '../../../containers/notifications/NotificationList';
import NotificationIcon from '../../../containers/notifications/NotificationList'

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


describe('Test notifications', () => {
    it('should render the Icon notification', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NotificationIcon />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});




describe("Should return the results", () => {
   const mock = new MockAdapter(Axios);
   const mockSuccessResponse = {
       notifications: [
           {
               body: "Africa my home",
               createdAt: "today"
           }
       ]
   }

   const wrapper = shallow(<NotificationList />);
   const spy = jest.spyOn(wrapper.instance(), 'componentDidMount');
   const componentDidMount = wrapper.instance().componentDidMount;



   it("should return notifiucation data", async () => {
       mock
       .onGet(url)
       .reply(200, mockSuccessResponse);
    const promise = componentDidMount()
    
   })
  
})