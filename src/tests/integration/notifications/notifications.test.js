import React from 'react';
import { shallow , mount } from '../../enzyme';
import NotificationList from '../../../containers/notifications/NotificationList';
import NotificationSummary from '../../../containers/notifications/NotificationSummary';
import axios from 'axios'
 
describe('notification component', () => {
  describe('when rendered', () => {
    it('should fetch a list of notifications', () => {
      const getSpy = jest.spyOn(axios, 'get');
      const NotificationListInstance = shallow(
        <NotificationList/>
      );
      expect(getSpy).toBeCalled();
    });
  });
});

describe('render notification summary', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      notification: {
        body: "@yundo posted an article at https://heroku.com/api/articles/slug/",
        createdAt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue magna ut hendrerit efficitur. Morbi lacinia, metus nec imperdiet iaculis, erat leo fringilla nisi, non consectetur nisl orci eu libero. Integer nunc leo, tristique ut pulvinar non, tristique quis tellus. Aenean rutrum urna vel neque egestas",
        url: "https://heroku.com/api/articles/slug/"
      },
    };
    wrapper = mount(<NotificationSummary  {...props} />);
  });
  it('should render article summary', () => {
    const response = wrapper.find(`[data-test="notificationSummary"]`);
    expect(response.length).toBe(1);
  });
})