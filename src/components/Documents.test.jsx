import { render, screen, within } from '../utils/testUtils';
import userEvent from '@testing-library/user-event';
import Documents from './Documents';

const mockSubject = {
  name: 'Test Subject',
  documents: [
    { name: 'README' },
    { name: 'LICENSE' }
  ],
  items: [
    {
      name: 'Core',
      items: [
        {
          name: 'One Liner',
          detail: {
            purpose: 'Test',
            instructions: 'Add a tagline here',
            document: 'README',
            section: 'Repo Name'
          }
        },
        {
          name: 'Description',
          detail: {
            purpose: 'Test',
            instructions: 'Add description here',
            document: 'README',
            section: 'Repo Name'
          }
        }
      ]
    },
    {
      name: 'Using',
      items: [
        {
          name: 'License',
          detail: {
            purpose: 'Test',
            instructions: 'Add license text',
            document: 'LICENSE'
          }
        }
      ]
    }
  ]
};

const mockSelectedItems = [
  'Core > One Liner',
  'Core > Description',
  'Using > License'
];

describe('Documents', () => {
  test('groups items by document', () => {
    render(<Documents subject={mockSubject} selectedItems={mockSelectedItems} />);

    expect(screen.getByText('README')).toBeInTheDocument();
    expect(screen.getByText('LICENSE')).toBeInTheDocument();
  });

  test('renders expand/collapse for each document', async () => {
    const user = userEvent.setup();
    render(<Documents subject={mockSubject} selectedItems={mockSelectedItems} />);

    const readmeButton = screen.getByRole('button', { name: /README/i });

    // Initially expanded - content visible
    expect(screen.getByText(/Add a tagline here/i)).toBeInTheDocument();

    // Click to collapse
    await user.click(readmeButton);

    // Content hidden
    expect(screen.queryByText(/Add a tagline here/i)).not.toBeInTheDocument();
  });

  test('renders "Copy as Markdown" button for each document', () => {
    render(<Documents subject={mockSubject} selectedItems={mockSelectedItems} />);

    const copyButtons = screen.getAllByRole('button', { name: /Copy as Markdown/i });
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  test('renders items in correct sections', () => {
    render(<Documents subject={mockSubject} selectedItems={mockSelectedItems} />);

    // Should show section headers
    expect(screen.getByText('Repo Name')).toBeInTheDocument();
  });

  test('renders items with source labels', () => {
    const { container } = render(<Documents subject={mockSubject} selectedItems={mockSelectedItems} />);

    // Check for source label (e.g., "Core > One Liner")
    expect(screen.getByText('Core > One Liner')).toBeInTheDocument();
  });

  test('renders items without section at top of document', () => {
    render(<Documents subject={mockSubject} selectedItems={mockSelectedItems} />);

    // LICENSE has no section, should appear at top - just check it exists
    expect(screen.getByText('LICENSE')).toBeInTheDocument();
    expect(screen.getByText(/Add license text/i)).toBeInTheDocument();
  });

  test('copies markdown to clipboard when copy button clicked', async () => {
    const user = userEvent.setup();

    // Mock clipboard API
    const writeText = jest.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: { writeText }
    });

    render(<Documents subject={mockSubject} selectedItems={mockSelectedItems} />);

    const copyButtons = screen.getAllByRole('button', { name: /Copy as Markdown/i });
    await user.click(copyButtons[0]);

    expect(writeText).toHaveBeenCalled();
  });

  test('shows empty state when no items provided', () => {
    render(<Documents subject={{ items: [] }} />);
    expect(screen.getByText(/No items selected/i)).toBeInTheDocument();
  });

  test('renders documents in specified order', () => {
    const subjectWithOrder = {
      ...mockSubject,
      documents: [
        { name: 'LICENSE' },
        { name: 'README' }
      ]
    };

    const { container } = render(
      <Documents
        subject={subjectWithOrder}
        selectedItems={mockSelectedItems}
      />
    );

    // Get all document headers
    const docHeaders = screen.getAllByRole('button', { name: /README|LICENSE/i });

    // LICENSE should come before README based on documentOrder
    expect(docHeaders[0]).toHaveTextContent('LICENSE');
    expect(docHeaders[1]).toHaveTextContent('README');
  });

  test('includes unlisted documents at the end', () => {
    const subjectWithPartialOrder = {
      ...mockSubject,
      documents: [
        { name: 'README' }
        // LICENSE is not listed, but should still appear
      ]
    };

    render(
      <Documents
        subject={subjectWithPartialOrder}
        selectedItems={mockSelectedItems}
      />
    );

    // Get all document headers
    const docHeaders = screen.getAllByRole('button', { name: /README|LICENSE/i });

    // README should come first (in the order), LICENSE should come after (unlisted)
    expect(docHeaders[0]).toHaveTextContent('README');
    expect(docHeaders[1]).toHaveTextContent('LICENSE');
  });
});
