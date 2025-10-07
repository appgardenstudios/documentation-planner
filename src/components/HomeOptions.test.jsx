import { render, screen } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import HomeOptions from './HomeOptions';

const mockSubject = {
  name: 'Repository',
  questions: [
    {
      question: 'What is the visibility of this repository? Select all that apply.',
      attributes: [
        { name: 'Internal', value: 'INTERNAL' },
        { name: 'External (public facing)', value: 'EXTERNAL' }
      ]
    },
    {
      question: 'What type(s) of software does this repository contain? Select all that apply.',
      attributes: [
        { name: 'Library', value: 'LIBRARY' },
        { name: 'Application', value: 'APPLICATION' }
      ]
    }
  ]
};

describe('HomeOptions', () => {
  test('renders header with subject name', () => {
    render(<HomeOptions subject={mockSubject} />);
    expect(screen.getByText(/Please answer the following questions about the repository you are documenting/i)).toBeInTheDocument();
  });

  test('renders all questions', () => {
    render(<HomeOptions subject={mockSubject} />);
    expect(screen.getByText('What is the visibility of this repository? Select all that apply.')).toBeInTheDocument();
    expect(screen.getByText('What type(s) of software does this repository contain? Select all that apply.')).toBeInTheDocument();
  });

  test('renders checkbox answers for each question', () => {
    render(<HomeOptions subject={mockSubject} />);
    expect(screen.getByLabelText('Internal')).toBeInTheDocument();
    expect(screen.getByLabelText('External (public facing)')).toBeInTheDocument();
    expect(screen.getByLabelText('Library')).toBeInTheDocument();
    expect(screen.getByLabelText('Application')).toBeInTheDocument();
  });

  test('renders "Plan My Documentation" button', () => {
    render(<HomeOptions subject={mockSubject} />);
    expect(screen.getByRole('button', { name: /Plan My Documentation/i })).toBeInTheDocument();
  });

  test('calls onSelectionChange when checkbox is toggled', async () => {
    const user = userEvent.setup();
    const onSelectionChange = jest.fn();

    render(<HomeOptions subject={mockSubject} onSelectionChange={onSelectionChange} />);

    const internalCheckbox = screen.getByLabelText('Internal');
    await user.click(internalCheckbox);

    expect(onSelectionChange).toHaveBeenCalled();
  });

  test('shows selected checkboxes based on selectedOptions prop', () => {
    const selectedOptions = {
      'What is the visibility of this repository? Select all that apply.': ['INTERNAL'],
      'What type(s) of software does this repository contain? Select all that apply.': ['LIBRARY']
    };

    render(<HomeOptions subject={mockSubject} selectedOptions={selectedOptions} />);

    expect(screen.getByLabelText('Internal')).toBeChecked();
    expect(screen.getByLabelText('Library')).toBeChecked();
    expect(screen.getByLabelText('External (public facing)')).not.toBeChecked();
  });

  test('calls onPlanClick when button is clicked', async () => {
    const user = userEvent.setup();
    const onPlanClick = jest.fn();
    const selectedOptions = {
      'What is the visibility of this repository? Select all that apply.': ['INTERNAL']
    };

    render(<HomeOptions subject={mockSubject} selectedOptions={selectedOptions} onPlanClick={onPlanClick} />);

    const button = screen.getByRole('button', { name: /Plan My Documentation/i });
    await user.click(button);

    expect(onPlanClick).toHaveBeenCalled();
  });

  test('button is disabled when no options are selected', () => {
    render(<HomeOptions subject={mockSubject} />);

    const button = screen.getByRole('button', { name: /Plan My Documentation/i });
    expect(button).toBeDisabled();
  });

  test('button is enabled when at least one option is selected', () => {
    const selectedOptions = {
      'What is the visibility of this repository? Select all that apply.': ['INTERNAL']
    };

    render(<HomeOptions subject={mockSubject} selectedOptions={selectedOptions} />);

    const button = screen.getByRole('button', { name: /Plan My Documentation/i });
    expect(button).not.toBeDisabled();
  });

  test('button is centered', () => {
    const { container } = render(<HomeOptions subject={mockSubject} />);

    const buttonWrapper = container.querySelector('.flex.justify-center');
    expect(buttonWrapper).toBeInTheDocument();
  });
});
