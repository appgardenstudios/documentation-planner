import { render, screen } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import Documentation from './Documentation';

const mockSubject = {
  name: 'Repository',
  questions: [
    {
      question: 'What is the visibility?',
      label: 'Visibility',
      attributes: [
        { name: 'Internal', value: 'INTERNAL' },
        { name: 'External', value: 'EXTERNAL' }
      ]
    }
  ],
  items: []
};

const mockSelectedOptions = {
  'What is the visibility?': ['INTERNAL', 'EXTERNAL']
};

describe('Documentation component', () => {
  test('renders sticky navbar with breadcrumb', () => {
    render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    expect(screen.getByText('Documentation Planner')).toBeInTheDocument();
    // Check for breadcrumb by looking for the separator and breadcrumb text
    const breadcrumb = screen.getByText('Repository', { selector: 'span.text-sm.font-medium.text-gray-900' });
    expect(breadcrumb).toBeInTheDocument();
  });

  test('renders selected options summary box', () => {
    render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    expect(screen.getByText('Visibility:')).toBeInTheDocument();
    expect(screen.getByText('Internal, External')).toBeInTheDocument();
  });

  test('renders edit options button with pencil icon', () => {
    render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit options/i });
    expect(editButton).toBeInTheDocument();
  });

  test('opens modal when edit button clicked', async () => {
    const user = userEvent.setup();

    render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit options/i });
    await user.click(editButton);

    // Modal should now be open (has 'open' attribute)
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('open');
  });

  test('renders ItemsToDocument component', () => {
    render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    // Check for the section heading
    expect(screen.getByText('Items to Document')).toBeInTheDocument();
  });

  test('renders DocumentsSection component', () => {
    render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    // DocumentsSection renders empty state message when no items
    expect(screen.getByText(/No items selected yet/i)).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('uses side-by-side layout on desktop', () => {
    const { container } = render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    // Check for layout classes
    const layout = container.querySelector('[class*="lg:grid"]');
    expect(layout).toBeInTheDocument();
  });

});
