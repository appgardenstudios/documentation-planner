/**
 * Reusable component for rendering questions with checkbox options
 *
 * @typedef {import('../data/index.js').Question} Question
 *
 * @param {Object} props
 * @param {Question[]} props.questions - Array of question objects with attributes
 * @param {string[]} props.selectedAttributes - Array of selected attribute values
 * @param {(attributes: string[]) => void} props.onSelectionChange - Callback when selection changes

 */
export default function Questions({
  questions,
  selectedAttributes = [],
  onSelectionChange = () => {}
}) {
  const handleCheckboxChange = (attributeValue, isChecked) => {
    let newAttributes;

    if (isChecked) {
      newAttributes = [...selectedAttributes, attributeValue];
    } else {
      newAttributes = selectedAttributes.filter(v => v !== attributeValue);
    }

    onSelectionChange(newAttributes);
  };

  return (
    <div className="space-y-8">
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {question.question}
          </h3>

          <div className="space-y-2">
            {question.attributes.map((attribute, aIndex) => {
              const isChecked = selectedAttributes.includes(attribute.value);

              return (
                <label
                  key={aIndex}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(attribute.value, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{attribute.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
