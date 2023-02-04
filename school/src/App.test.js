import { render, screen } from '@testing-library/react';
import school from './school';

test('renders learn react link', () => {
  render(<school />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
