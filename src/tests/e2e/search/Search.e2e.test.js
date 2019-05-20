import React from 'react';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow, mount } from '../../enzyme';
import Search from '../../../containers/search/Search';

describe("Search", () => {
    
  it("Should render main component and modal child components", () => {
    const wrapper = mount(<Search />);
    expect(wrapper.find('Modal')).toHaveLength(1)
  });

  describe("Should submit form and return the results", () => {
    const mock = new MockAdapter(Axios);
    const mockSuccessResponse = {
      articles: [
        {
          author: {email: "test@mail.com", username: "tester"},
          title: "Testing 101",
          description: "This is a mock description",
          id: 1,
          is_published: true,
          like_count: 10,
          read_time: "1 min",
          slug: "testing-101-aef296f3c2b2"
        }
      ]
    }
    const mockNoResultsResponse = {
      articles: []
    }

    const wrapper = shallow(<Search />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSearch');

    const handleSearch = wrapper.instance().handleSearch;
    let dataReturned;


    it("Should return search data", async () => { 
      mock
        .onGet('https://ah-the-answer-backend-staging.herokuapp.com/api/articles/?search=test')
        .reply(200, mockSuccessResponse);
    
      const promise = handleSearch({
        target: {
          search: {
            value: 'test'
          },
          filter: {
            value: 'all'
          }
        },
        preventDefault: jest.fn()
      });
      await promise.then(
        (res) => {
          dataReturned = res.data
        }
      );
      wrapper.update()

      expect(spy).toBeCalled();
      expect(dataReturned).toEqual(mockSuccessResponse);
      expect(wrapper.instance().state.results.data).toEqual(mockSuccessResponse.articles);
    });
  
    it("Should filter data by title", async () => {
      mock
        .onGet('https://ah-the-answer-backend-staging.herokuapp.com/api/articles/?title=Testing 101')
        .reply(200, mockSuccessResponse);
    
      const promise = handleSearch({
        target: {
          search: {
            value: 'Testing 101'
          },
          filter: {
            value: 'title'
          }
        },
        preventDefault: jest.fn()
      });
      await promise.then(
        (res) => {
          dataReturned = res.data
        }
      );
      wrapper.update()

      expect(spy).toBeCalled();
      expect(dataReturned).toEqual(mockSuccessResponse);
      expect(wrapper.instance().state.results.data).toEqual(mockSuccessResponse.articles);
    });

    it("Should filter data by author", async () => {
      mock
        .onGet('https://ah-the-answer-backend-staging.herokuapp.com/api/articles/?author=tester')
        .reply(200, mockSuccessResponse);
    
      const promise = handleSearch({
        target: {
          search: {
            value: 'tester'
          },
          filter: {
            value: 'author'
          }
        },
        preventDefault: jest.fn()
      });
      await promise.then(
        (res) => {
          dataReturned = res.data
        }
      );
      wrapper.update()

      expect(spy).toBeCalled();
      expect(dataReturned).toEqual(mockSuccessResponse);
      expect(wrapper.instance().state.results.data).toEqual(mockSuccessResponse.articles);
    });

    it("Should show a message if no result found", async () => {
      mock
        .onGet('https://ah-the-answer-backend-staging.herokuapp.com/api/articles/?search=nonExistent')
        .reply(200, mockNoResultsResponse);
    
      const promise = handleSearch({
        target: {
          search: {
            value: 'nonExistent'
          },
          filter: {
            value: 'all'
          }
        },
        preventDefault: jest.fn()
      });
      await promise.then(
        (res) => {
          dataReturned = res.data
        }
      );
      wrapper.update()

      expect(spy).toBeCalled();
      expect(dataReturned).toEqual(mockNoResultsResponse);
      expect(wrapper.instance().state.results.data).toEqual(mockNoResultsResponse.articles);
    });
  })
})