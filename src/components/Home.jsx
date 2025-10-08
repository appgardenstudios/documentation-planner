import { useRef, useEffect } from 'react';
import SubjectTiles from './SubjectTiles';
import Questions from './Questions';
import Footer from './Footer';
import Logo from '../assets/images/logo.svg';
import GitHubIcon from '../assets/images/github.svg';

/**
 * Home page component with subject selection and questions
 *
 * @typedef {import('../data/index.js').Subject} Subject
 *
 * @param {Object} props
 * @param {Subject[]} props.subjects - Array of available subjects
 * @param {Subject|null} props.selectedSubject - Currently selected subject object
 * @param {string[]} props.selectedAttributes - Array of selected attribute values
 * @param {(subjectName: string) => void} props.onSubjectSelect - Callback when subject is selected
 * @param {(attributes: string[]) => void} props.onAttributesChange - Callback when attributes change
 */
export default function Home({
  subjects = [],
  selectedSubject = null,
  selectedAttributes = [],
  onSubjectSelect = () => {},
  onAttributesChange = () => {}
}) {
  const questionRef = useRef(null);

  // Scroll to question when subject is selected
  useEffect(() => {
    if (selectedSubject && questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedSubject]);

  const handlePlanClick = () => {
    // Navigate to documentation page
    const params = new URLSearchParams(window.location.search);
    window.history.pushState({}, '', `/documentation?${params.toString()}`);
    // Trigger a re-render by dispatching popstate event
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const hasQuestions = selectedSubject?.questions && selectedSubject.questions.length > 0;

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* GitHub Link */}
      <div className="absolute top-4 right-4">
        <a
          href="https://github.com/appgardenstudios/documentation-planner"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="View on GitHub"
        >
          <img
            src={GitHubIcon}
            alt="GitHub"
            className="h-6 w-6"
          />
        </a>
      </div>

      {/* Hero Section */}
      <div className="text-center py-24 px-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src={Logo} alt="" className="h-10 w-10" aria-hidden="true" />
          <h1 className="text-5xl font-bold text-gray-900">Documentation Planner</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Identify what to document for your software product team.
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 ref={questionRef} className="text-3xl font-bold text-gray-900 mb-8">
            What are you documenting?
          </h2>

          <SubjectTiles
            subjects={subjects}
            selectedSubject={selectedSubject?.name || null}
            onSelect={onSubjectSelect}
          />
        </div>

        {selectedSubject && (
          <div className="container max-w-2xl mx-auto mt-12 mb-16">
            {hasQuestions && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Please answer the following questions about the {selectedSubject.name.toLowerCase()} you are documenting.
                </h2>

                <Questions
                  questions={selectedSubject.questions}
                  selectedAttributes={selectedAttributes}
                  onSelectionChange={onAttributesChange}
                />
              </>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={handlePlanClick}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Plan My Documentation
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
