/**
 * Component for displaying selectable subject tiles
 *
 * @typedef {import('../data/index.js').Subject} Subject
 *
 * @param {Object} props
 * @param {Subject[]} props.subjects - Array of subject objects with name and icon
 * @param {string|null} props.selectedSubject - Name of currently selected subject
 * @param {(subjectName: string) => void} props.onSelect - Callback when subject is selected

 */
export default function SubjectTiles({ subjects = [], selectedSubject = null, onSelect = () => {} }) {
  return (
    <div className="flex flex-wrap gap-6 justify-center" role="radiogroup" aria-label="Select what you are documenting">
      {subjects.map((subject) => {
        const isSelected = selectedSubject === subject.name;

        return (
          <label
            key={subject.name}
            className={`
              flex flex-col items-center justify-center
              w-40 h-40 p-6
              border-2 rounded-lg cursor-pointer
              transition-all duration-200
              ${isSelected
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-blue-600 hover:shadow-md'
              }
            `}
          >
            <input
              type="radio"
              name="subject"
              value={subject.name}
              checked={isSelected}
              onChange={() => onSelect(subject.name)}
              className="sr-only"
              aria-label={subject.name}
            />
            <img
              src={subject.icon}
              alt=""
              className="w-16 h-16 mb-3"
              aria-hidden="true"
            />
            <span className="text-lg font-bold text-gray-900">
              {subject.name}
            </span>
          </label>
        );
      })}
    </div>
  );
}
