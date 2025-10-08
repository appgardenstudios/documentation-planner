import { render, screen } from '../utils/testUtils';
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

  test('renders Documents component', () => {
    render(
      <Documentation
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    // Documents renders empty state message when no items
    expect(screen.getByText(/No items selected yet/i)).toBeInTheDocument();
  });
});
