import { render, screen } from '../utils/testUtils';
import userEvent from '@testing-library/user-event';
import ItemsToDocument from './ItemsToDocument';

const mockItems = [
  {
    name: 'Core',
    items: [
      {
        name: 'One Liner',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions',
          document: 'README',
          attributes: ['EXTERNAL']
        }
      },
      {
        name: 'Description',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions',
          document: 'README'
          // No attributes = always shown
        }
      }
    ]
  },
  {
    name: 'Marketing',
    items: [
      {
        name: 'Benefits',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions',
          document: 'README',
          attributes: ['INTERNAL']
        }
      }
    ]
  }
];

describe('ItemsToDocument', () => {
  test('renders category headers', () => {
    render(<ItemsToDocument items={mockItems} selectedAttributes={['EXTERNAL']} />);
    expect(screen.getByText('Core')).toBeInTheDocument();
  });

  test('categories are expandable/collapsible', async () => {
    const user = userEvent.setup();
    render(<ItemsToDocument items={mockItems} selectedAttributes={['EXTERNAL']} />);

    const coreButton = screen.getByRole('button', { name: /Core/i });

    // Initially expanded - items visible
    expect(screen.getByText('One Liner')).toBeInTheDocument();

    // Click to collapse
    await user.click(coreButton);

    // Items hidden
    expect(screen.queryByText('One Liner')).not.toBeInTheDocument();
  });

  test('shows items that do not have attributes regardless of attributes', () => {
    render(<ItemsToDocument items={mockItems} selectedAttributes={['EXTERNAL']} />);

    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  test('calls onSelectionChange when item clicked', async () => {
    const user = userEvent.setup();
    const onSelectionChange = jest.fn();

    render(
      <ItemsToDocument
        items={mockItems}
        selectedAttributes={['EXTERNAL']}
        onSelectionChange={onSelectionChange}
      />
    );

    const oneLinerCheckbox = screen.getByLabelText('One Liner');
    await user.click(oneLinerCheckbox);

    expect(onSelectionChange).toHaveBeenCalled();
  });

  test('can select individual child items', async () => {
    const user = userEvent.setup();
    const onSelectionChange = jest.fn();

    render(
      <ItemsToDocument
        items={mockItems}
        selectedAttributes={['EXTERNAL']}
        selectedItems={[]}
        onSelectionChange={onSelectionChange}
      />
    );

    const oneLinerCheckbox = screen.getByLabelText('One Liner');
    await user.click(oneLinerCheckbox);

    // Should add the selected item
    expect(onSelectionChange).toHaveBeenCalledWith(['Core > One Liner']);
  });
});
