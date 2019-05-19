import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../../containers/search/SearchModal';

describe("Modal", () => {
  it("should render the modal", () => {
    const div = document.createElement('div');
    const data = {
      status: true,
      data: [
        {
          body: "string",
          date_created: "2019-05-14T07:17:03.652961Z",
          date_modified: "2019-05-14T07:17:03.653012Z",
          description: "string",
          dislike_count: 1,
          id: 38,
          is_published: true,
          like_count: 0,
          read_time: "1 min",
          slug: "string-659493d76a0c",
          tags: ["Technolgy"],
          title: "string",
        }
      ]
    }
    ReactDOM.render(
      <Modal 
        results={data}
        handleSearch={jest.fn()}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});