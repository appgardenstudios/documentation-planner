import { render, screen } from '../utils/test-utils';
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

  test('renders tiles with base64 icons', () => {
    const { container } = render(<SubjectTiles subjects={mockSubjects} />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', mockSubjects[0].icon);
  });

  test('uses flexbox with flex-wrap layout', () => {
    const { container } = render(<SubjectTiles subjects={mockSubjects} />);
    const tilesContainer = container.querySelector('[class*="flex"]');
    expect(tilesContainer).toBeInTheDocument();
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

  test('shows hover state with colored outline', () => {
    const { container } = render(<SubjectTiles subjects={mockSubjects} />);
    // Check for hover classes in the tile labels
    const labels = container.querySelectorAll('label');
    expect(labels[0].className).toMatch(/hover:/);
  });

  test('renders empty when no subjects provided', () => {
    const { container } = render(<SubjectTiles subjects={[]} />);
    const radioButtons = screen.queryAllByRole('radio');
    expect(radioButtons).toHaveLength(0);
  });
});
