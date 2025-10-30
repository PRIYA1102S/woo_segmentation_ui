import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Frontend Application', () => {
  test('renders the main application', () => {
    render(<App />);
    const linkElement = screen.getByText(/Products/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders the segments page', () => {
    render(<App />);
    const linkElement = screen.getByText(/Segments/i);
    expect(linkElement).toBeInTheDocument();
  });
});