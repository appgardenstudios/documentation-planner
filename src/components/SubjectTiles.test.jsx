import { render, screen } from '../utils/testUtils';
import userEvent from '@testing-library/user-event';
import SubjectTiles from './SubjectTiles';

const mockSubjects = [
  {
    name: 'Repository',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjwvc3ZnPg==',
    questions: [],
    items: []
  },
  {
    name: 'System',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjwvc3ZnPg==',
    questions: [],
    items: []
  }
];

describe('SubjectTiles', () => {
  test('renders tiles for each subject', () => {
    render(<SubjectTiles subjects={mockSubjects} />);
    expect(screen.getByText('Repository')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  test('implements radio button semantics for accessibility', () => {
    render(<SubjectTiles subjects={mockSubjects} />);
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(2);
  });

  test('calls onSelect when tile is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<SubjectTiles subjects={mockSubjects} onSelect={onSelect} />);

    const repoRadio = screen.getByLabelText('Repository');
    await user.click(repoRadio);

    expect(onSelect).toHaveBeenCalledWith('Repository');
  });

  test('shows selected state for selected tile', () => {
    render(<SubjectTiles subjects={mockSubjects} selectedSubject="Repository" />);
    const repoRadio = screen.getByLabelText('Repository');
    expect(repoRadio).toBeChecked();
  });
});
