import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('it works', () => {
  const { getAllByText } = render(<App />);
  expect(getAllByText(/Hello World/i)).toBeTruthy();
});
