import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import sinon from 'sinon';

describe('the overall app', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('renders without crashing', () => {
    const subject = render(<App />);
    expect(subject).toBeDefined();
  });
});
