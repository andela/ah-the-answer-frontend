import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom'
import MockAdapter from 'axios-mock-adapter';
import { shallow , mount } from '../../enzyme';
import NotificationList from '../../../containers/notifications/NotificationList';
import NotificationIcon from '../../../containers/notifications/NotificationIcon';
import NotificationDetails from '../../../containers/notifications/NotificationDetails';
import Toggle from '../../../containers/notifications/ToggleSwitch';

const url = 'https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/subscription';
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
    it('should render the notification page', () => {
        const div = document.createElement('div');
        const props = {
            match: {
              params: {
                id: 1,
              },
            },
          };
        ReactDOM.render(<NotificationDetails {...props}/>, div);
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

describe('Test toggle button', () => {
    it('should render the Icon notification', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Toggle />, div);
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
   const spy = jest.spyOn(wrapper.instance(), 'getNotifications');
   const getNotifications= wrapper.instance().getNotifications;



   it("should return notification data", async () => {
       mock
       .onGet(url)
       .reply(200, mockSuccessResponse);
       getNotifications()
    
   })
  
})


    describe('should make api calls', () => {
      const spy = jest.spyOn(NotificationList.prototype, 'getNotifications');
      const wrapper = shallow(< NotificationList />);
      const getNotifications= wrapper.instance().getNotifications;
      console.log(getNotifications)
      const mockResponse = {
        
            subscription: {status: "true"}
        
      };
  
      beforeEach(() => {
        const mock = new MockAdapter(Axios);
        mock
          .onGet(url)
          .reply(200, mockResponse);
         

          getNotifications()
       
      });
  
      it('should call handleSubmit', () => {
        expect(spy).toHaveBeenCalled();
      });
      it('should update the state with error messages', () => {
        const { state } = wrapper.instance();
        console.log(state)
        
        expect(state.isSubscribed).toBe(mockResponse.subscription.status);
      });
    });
  
    describe('should make api calls', () => {
        const spy = jest.spyOn(NotificationList.prototype, 'getNotifications');
        const wrapper = shallow(< NotificationList />);
        const getNotifications= wrapper.instance().getNotifications;
        console.log(getNotifications)
        const mockResponse = {
          
              subscription: {status: "false"}
          
        };
    
        beforeEach(() => {
          const mock = new MockAdapter(Axios);
          mock
            .onGet(url)
            .reply(200, mockResponse);
           
  
            getNotifications()
         
        });
    
        it('should call handleSubmit', () => {
          expect(spy).toHaveBeenCalled();
        });
        it('should update the state with error messages', () => {
          const { state } = wrapper.instance();
          
          expect(state.isSubscribed).toBe(mockResponse.subscription.status);
        });
      });
  
      describe('marks notification as read', () => {
        const spy = jest.spyOn(NotificationList.prototype, 'MarkNotificationRead');
        const wrapper = shallow(< NotificationList />);
        const MarkNotificationRead= wrapper.instance().MarkNotificationRead;
    
        beforeEach(() => {
          const mock = new MockAdapter(Axios);
          mock
            .onGet('https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/read-all')
        
            MarkNotificationRead()
         
        });
    
        it('should call handleSubmit', () => {
          expect(spy).toHaveBeenCalled();
        });
      });

    describe('gets notifications status', () => {
        const spy = jest.spyOn(NotificationList.prototype, 'handleClick');
        const wrapper = shallow(< NotificationList />);
        const handleClick= wrapper.instance().handleClick;
    
        beforeEach(() => {
          const mock = new MockAdapter(Axios);
          mock
            .onGet('https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/subscription')
        
            handleClick()
         
        });
    
        it('should call handleSubmit', () => {
          expect(spy).toHaveBeenCalled();
        });
      });

      describe('should update state', () => {
        const spy = jest.spyOn(NotificationList.prototype, 'getAllNotifications');
        const wrapper = shallow(< NotificationList />);
        const getAllNotifications= wrapper.instance().getAllNotifications;
        console.log(getAllNotifications)
        const mockResponse = {
          
                  notifications: [
                    {
                        d: 11, createdAt: "2019-05-22T15:12:54.734769Z", 
                        body: "@author has posted a new article at https://ah-the…es/why-design-thinking-is-important-b9bfb2b33afb/",
                         recepient: {email: "njihiadarius@gmail.com", username: "darius"}
                        },
                    {
                        d: 11, createdAt: "2019-05-22T15:12:54.734769Z", 
                        body: "@cliff has posted a new article at https://ah-the…es/why-design-thinking-is-important-b9bfb2b33afb/",
                        recepient: {email: "njihiadarius@gmail.com", username: "darius"}
                        },
                  ]
              
          
        };
    
        beforeEach(() => {
          const mock = new MockAdapter(Axios);
          mock
            .onGet('https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/')
            .reply(200, mockResponse);
           
            getAllNotifications()
         
        });
    
        it('should call handleSubmit', () => {
          expect(spy).toHaveBeenCalled();
        });
        });


        describe('should update state', () => {
            const wrapper = shallow(<NotificationIcon />);
            const instance = wrapper.instance();
            const spy = jest.spyOn(instance, 'checkStatus');
            const checkStatus= wrapper.instance().checkStatus;
            const mockResponse = {
          
                subscription: {status: "true"}
            
          };
    
            beforeEach(() => {
              const mock = new MockAdapter(Axios);
              mock
                .onGet('https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/subscription/')
                .reply(200, mockResponse);

                checkStatus()
             
            });
        
            it('should call checkstatus', () => {
              expect(spy).toHaveBeenCalled();
            });
            });
        

        describe('should update state', () => {
            const wrapper = shallow(<NotificationIcon />);
            const instance = wrapper.instance();
            const spy = jest.spyOn(instance, 'handleOnclick');
            const handleOnclick= wrapper.instance().handleOnclick;
            
      
        
            beforeEach(() => {
            const mock = new MockAdapter(Axios);
            mock
                .onGet('https://ah-the-answer-backend-staging.herokuapp.com/api/notifications/subscription/')
                
                handleOnclick()
                
                });
            
                it('should call handleClick', () => {
                expect(spy).toHaveBeenCalled();
                });
            });

            