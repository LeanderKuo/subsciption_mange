import { render, screen } from '@testing-library/react';
import App from './App';

test('renders subscription management header', () => {
  render(<App />);
  expect(screen.getByText(/Subscription Manager/i)).toBeInTheDocument();
});
