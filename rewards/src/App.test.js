import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Rewards Points Earned heading', () => {
  render(<App />);
  const heading = screen.getByText("Rewards Points Earned");
  expect(heading).toBeInTheDocument();
});

