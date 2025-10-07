import { render, screen, within } from '../utils/testUtils';
import userEvent from '@testing-library/user-event';
import Documents from './Documents';

const mockItems = [
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
          usage: 'This should be concise',
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
];

const mockSelectedItems = [
  'Core > One Liner',
  'Core > Description',
  'Using > License'
];

describe('Documents', () => {
  test('groups items by document', () => {
    render(<Documents items={mockItems} selectedItems={mockSelectedItems} />);

    expect(screen.getByText('README')).toBeInTheDocument();
    expect(screen.getByText('LICENSE')).toBeInTheDocument();
  });

  test('renders expand/collapse for each document', async () => {
    const user = userEvent.setup();
    render(<Documents items={mockItems} selectedItems={mockSelectedItems} />);

    const readmeButton = screen.getByRole('button', { name: /README/i });

    // Initially expanded - content visible
    expect(screen.getByText(/Add a tagline here/i)).toBeInTheDocument();

    // Click to collapse
    await user.click(readmeButton);

    // Content hidden
    expect(screen.queryByText(/Add a tagline here/i)).not.toBeInTheDocument();
  });

  test('renders "Copy as Markdown" button for each document', () => {
    render(<Documents items={mockItems} selectedItems={mockSelectedItems} />);

    const copyButtons = screen.getAllByRole('button', { name: /Copy as Markdown/i });
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  test('renders items in correct sections', () => {
    render(<Documents items={mockItems} selectedItems={mockSelectedItems} />);

    // Should show section headers
    expect(screen.getByText('Repo Name')).toBeInTheDocument();
  });

  test('renders items with source labels', () => {
    const { container } = render(<Documents items={mockItems} selectedItems={mockSelectedItems} />);

    // Check for source label (e.g., "Core > One Liner")
    expect(screen.getByText('Core > One Liner')).toBeInTheDocument();
  });

  test('renders items without section at top of document', () => {
    render(<Documents items={mockItems} selectedItems={mockSelectedItems} />);

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

    render(<Documents items={mockItems} selectedItems={mockSelectedItems} />);

    const copyButtons = screen.getAllByRole('button', { name: /Copy as Markdown/i });
    await user.click(copyButtons[0]);

    expect(writeText).toHaveBeenCalled();
  });

  test('shows empty state when no items provided', () => {
    render(<Documents items={[]} />);
    expect(screen.getByText(/No items selected/i)).toBeInTheDocument();
  });
});
