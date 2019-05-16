import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../../../containers/search/Search';
import Modal from '../../../containers/search/SearchModal';


describe("Search", () => {
    it("should render the search component", () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Search />,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
  });