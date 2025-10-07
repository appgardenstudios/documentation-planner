import QuestionOptions from './QuestionOptions';

export default function HomeOptions({
  subject,
  selectedOptions = {},
  onSelectionChange = () => {},
  onPlanClick = () => {}
}) {
  if (!subject) return null;

  const hasQuestions = subject.questions && subject.questions.length > 0;

  // Button is always enabled - users can proceed without selecting options
  const hasSelectedOptions = true;

  return (
    <div className="container max-w-2xl mx-auto mt-12 mb-16">
      {hasQuestions && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Please answer the following questions about the {subject.name.toLowerCase()} you are documenting.
          </h2>

          <QuestionOptions
            questions={subject.questions}
            selectedOptions={selectedOptions}
            onSelectionChange={onSelectionChange}
          />
        </>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={onPlanClick}
          disabled={!hasSelectedOptions}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 cursor-pointer"
        >
          Plan My Documentation
        </button>
      </div>
    </div>
  );
}
