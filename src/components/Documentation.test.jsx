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
  test('renders navbar with breadcrumb', () => {
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

  test('uses side-by-side flex layout on desktop', () => {
    const { container } = render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    // Check for flex layout classes
    const layout = container.querySelector('[class*="lg:flex-row"]');
    expect(layout).toBeInTheDocument();
  });

});
