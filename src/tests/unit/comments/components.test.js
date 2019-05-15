import React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import CreateComments from '../../../containers/comments/CreateComments';
import store from '../../../store/store';

describe('Render Create Components', () => {
  test('should be able to render CreateComponent component', () => {
    const testComponent = create(
      <Provider store={store}>
        <CreateComments />
      </Provider>,
		);
		expect(testComponent.toJSON()).toMatchSnapshot()
  });
  test('should be check initial state', () => {
    const testComponent = create(
      <Provider store={store}>
        <CreateComments />
      </Provider>,
		);
			const instance = testComponent.getInstance()
			console.log(instance);
  });
});
