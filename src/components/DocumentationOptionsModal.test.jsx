import { render, screen } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import DocumentationOptionsModal from './DocumentationOptionsModal';

const mockSubject = {
  name: 'Repository',
  questions: [
    {
      question: 'What is the visibility?',
      attributes: [
        { name: 'Internal', value: 'INTERNAL' },
        { name: 'External', value: 'EXTERNAL' }
      ]
    }
  ]
};

const mockSelectedOptions = {
  'What is the visibility?': ['INTERNAL']
};

describe('DocumentationOptionsModal', () => {
  test('renders nothing when not open', () => {
    const { container } = render(
      <DocumentationOptionsModal
        isOpen={false}
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    expect(container.querySelector('dialog')).not.toBeInTheDocument();
  });

  test('renders dialog element when open', () => {
    render(
      <DocumentationOptionsModal
        isOpen={true}
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('renders modal with same questions as HomeOptions', () => {
    render(
      <DocumentationOptionsModal
        isOpen={true}
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    expect(screen.getByText('What is the visibility?')).toBeInTheDocument();
    expect(screen.getByLabelText('Internal')).toBeInTheDocument();
    expect(screen.getByLabelText('External')).toBeInTheDocument();
  });

  test('shows currently selected options', () => {
    render(
      <DocumentationOptionsModal
        isOpen={true}
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    expect(screen.getByLabelText('Internal')).toBeChecked();
    expect(screen.getByLabelText('External')).not.toBeChecked();
  });

  test('renders Cancel and Apply buttons', () => {
    render(
      <DocumentationOptionsModal
        isOpen={true}
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Apply/i })).toBeInTheDocument();
  });

  test('calls onCancel when Cancel button clicked', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();

    render(
      <DocumentationOptionsModal
        isOpen={true}
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
        onCancel={onCancel}
      />
    );

    await user.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });

  test('calls onApply with updated options when Apply clicked', async () => {
    const user = userEvent.setup();
    const onApply = jest.fn();

    render(
      <DocumentationOptionsModal
        isOpen={true}
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
        onApply={onApply}
      />
    );

    // Change selection
    await user.click(screen.getByLabelText('External'));

    // Apply changes
    await user.click(screen.getByRole('button', { name: /Apply/i }));

    expect(onApply).toHaveBeenCalledWith({
      'What is the visibility?': ['INTERNAL', 'EXTERNAL']
    });
  });

  test('closes on ESC key', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();

    render(
      <DocumentationOptionsModal
        isOpen={true}
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
        onCancel={onCancel}
      />
    );

    await user.keyboard('{Escape}');
    expect(onCancel).toHaveBeenCalled();
  });

  test('has proper accessibility attributes', () => {
    render(
      <DocumentationOptionsModal
        isOpen={true}
        subject={mockSubject}
        selectedOptions={mockSelectedOptions}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
