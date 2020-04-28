import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const subject = render(<App />);
  expect(subject).toBeDefined();
});
