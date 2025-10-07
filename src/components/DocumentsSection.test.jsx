import { render, screen, within } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import DocumentsSection from './DocumentsSection';

const mockOrderedItems = [
  {
    name: 'One Liner',
    path: 'Core>One Liner',
    detail: {
      purpose: 'Test',
      instructions: 'Add a tagline here',
      document: 'README',
      section: 'Repo Name'
    }
  },
  {
    name: 'Description',
    path: 'Core>Description',
    detail: {
      purpose: 'Test',
      instructions: 'Add description here',
      usage: 'This should be concise',
      document: 'README',
      section: 'Repo Name'
    }
  },
  {
    name: 'License',
    path: 'Using>License',
    detail: {
      purpose: 'Test',
      instructions: 'Add license text',
      document: 'LICENSE'
    }
  }
];

describe('DocumentsSection', () => {
  test('groups items by document', () => {
    render(<DocumentsSection items={mockOrderedItems} />);

    expect(screen.getByText('README')).toBeInTheDocument();
    expect(screen.getByText('LICENSE')).toBeInTheDocument();
  });

  test('renders expand/collapse for each document', async () => {
    const user = userEvent.setup();
    render(<DocumentsSection items={mockOrderedItems} />);

    const readmeButton = screen.getByRole('button', { name: /README/i });

    // Initially expanded - content visible
    expect(screen.getByText(/Add a tagline here/i)).toBeInTheDocument();

    // Click to collapse
    await user.click(readmeButton);

    // Content hidden
    expect(screen.queryByText(/Add a tagline here/i)).not.toBeInTheDocument();
  });

  test('renders "Copy as Markdown" button for each document', () => {
    render(<DocumentsSection items={mockOrderedItems} />);

    const copyButtons = screen.getAllByRole('button', { name: /Copy as Markdown/i });
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  test('renders items in correct sections', () => {
    render(<DocumentsSection items={mockOrderedItems} />);

    // Should show section headers
    expect(screen.getByText('Repo Name')).toBeInTheDocument();
  });

  test('renders items with source labels in dashed outline', () => {
    const { container } = render(<DocumentsSection items={mockOrderedItems} />);

    // Check for source label (e.g., "Core > One Liner")
    expect(screen.getByText('Core > One Liner')).toBeInTheDocument();

    // Check for dashed border styling
    const sourceLabels = container.querySelectorAll('[class*="border-dashed"]');
    expect(sourceLabels.length).toBeGreaterThan(0);
  });

  test('renders items without section at top of document', () => {
    render(<DocumentsSection items={mockOrderedItems} />);

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

    render(<DocumentsSection items={mockOrderedItems} />);

    const copyButtons = screen.getAllByRole('button', { name: /Copy as Markdown/i });
    await user.click(copyButtons[0]);

    expect(writeText).toHaveBeenCalled();
  });

  test('markdown does not include source labels or dashed boxes', async () => {
    const user = userEvent.setup();

    let copiedText = '';
    const writeText = jest.fn((text) => {
      copiedText = text;
      return Promise.resolve();
    });
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: { writeText }
    });

    render(<DocumentsSection items={mockOrderedItems} />);

    const copyButtons = screen.getAllByRole('button', { name: /Copy as Markdown/i });
    await user.click(copyButtons[0]);

    // Should not contain the source label text format
    expect(copiedText).not.toContain('Core > One Liner');
    // Should contain the actual instructions
    expect(copiedText).toContain('Add a tagline here');
  });

  test('renders items with usage when present', () => {
    render(<DocumentsSection items={mockOrderedItems} />);
    expect(screen.getByText('This should be concise')).toBeInTheDocument();
  });

  test('shows empty state when no items provided', () => {
    render(<DocumentsSection items={[]} />);
    expect(screen.getByText(/No items selected/i)).toBeInTheDocument();
  });
});
