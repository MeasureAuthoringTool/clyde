import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app welcome page', () => {
  render(<App />);
  const appName = screen.getByText(/Welcome to Clyde/i);
  expect(appName).toBeInTheDocument();
});
