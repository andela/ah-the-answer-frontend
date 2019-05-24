import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from '../../enzyme';
import Pages from '../../../containers/articles/Pages';

describe('Pagination tests', () => {
  it("should render the pagination buttons", () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Pages changeOffset={jest.fn()} articleCount={10}/>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("should render the right number of buttons", () => {
    const wrapper = shallow(<Pages changeOffset={jest.fn()} articleCount={30}/>)
    const countItems = wrapper.find('li')
    expect(countItems).toHaveLength(3)
  });
  it("should update the state onClick", () => {
    const wrapper = shallow(<Pages changeOffset={jest.fn()} articleCount={20}/>)
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');

    const initial = wrapper.instance().state
    wrapper.instance().handleChange(2)
    wrapper.update()
    const current = wrapper.instance().state

    expect(spy).toBeCalled()
    expect(initial.active === current.active ).toBeFalsy
    expect(current.active).toBe(2)
  })
  it("should call handleChange on clicking the page button", () => {
    const wrapper = shallow(<Pages changeOffset={jest.fn()} articleCount={10}/>)
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');
    wrapper.find('button').simulate('click')
    expect(spy).toBeCalled()
  })
})