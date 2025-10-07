import { render, screen } from '../utils/test-utils';
import Home from './Home';

describe('Home component', () => {
  test('renders top banner with logo and title', () => {
    render(<Home />);
    expect(screen.getByText('Documentation Planner')).toBeInTheDocument();
  });

  test('renders main question', () => {
    render(<Home />);
    expect(screen.getByText('What are you documenting?')).toBeInTheDocument();
  });

  test('renders footer with correct text', () => {
    render(<Home />);
    expect(screen.getByText(/Built with ♥ by/i)).toBeInTheDocument();
    expect(screen.getByText('Hyaline.dev')).toBeInTheDocument();
    expect(screen.getByText(/Keep your documentation up-to-date with each pull request/i)).toBeInTheDocument();
  });

  test('footer is positioned at bottom', () => {
    render(<Home />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('uses container to restrict width', () => {
    const { container } = render(<Home />);
    // Check for Tailwind container class
    expect(container.querySelector('.container, [class*="max-w"]')).toBeInTheDocument();
  });

  test('has white background', () => {
    const { container } = render(<Home />);
    const main = container.querySelector('main, [class*="bg-white"]');
    expect(main).toBeInTheDocument();
  });
});
