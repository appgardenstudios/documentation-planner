/**
 * Reusable component for rendering questions with checkbox options
 * Used in both HomeOptions and DocumentationOptions modal
 */
export default function QuestionOptions({
  questions,
  selectedOptions = {},
  onSelectionChange = () => {}
}) {
  const handleCheckboxChange = (questionText, attributeValue, isChecked) => {
    const currentValues = selectedOptions[questionText] || [];
    let newValues;

    if (isChecked) {
      newValues = [...currentValues, attributeValue];
    } else {
      newValues = currentValues.filter(v => v !== attributeValue);
    }

    onSelectionChange({
      ...selectedOptions,
      [questionText]: newValues
    });
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
              const isChecked = selectedOptions[question.question]?.includes(attribute.value) || false;

              return (
                <label
                  key={aIndex}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(question.question, attribute.value, e.target.checked)}
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
