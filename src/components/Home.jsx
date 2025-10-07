import { useRef, useEffect } from 'react';
import SubjectTiles from './SubjectTiles';
import HomeOptions from './HomeOptions';
import Footer from './Footer';
import Logo from '../assets/images/logo.svg';

export default function Home({
  subjects = [],
  selectedSubject = null,
  selectedOptions = {},
  onSubjectSelect = () => {},
  onOptionsChange = () => {}
}) {
  const questionRef = useRef(null);

  // Scroll to question when subject is selected
  useEffect(() => {
    if (selectedSubject && questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedSubject]);

  const handlePlanClick = () => {
    // Set the 'planned' flag to navigate to documentation page
    const params = new URLSearchParams(window.location.search);
    params.set('planned', 'true');
    window.history.pushState({}, '', `?${params.toString()}`);
    // Trigger a re-render by dispatching popstate event
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <div className="text-center py-24 px-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src={Logo} alt="" className="h-10 w-10" aria-hidden="true" />
          <h1 className="text-5xl font-bold text-gray-900">Documentation Planner</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          An opinionated superset of documentation that could be included when documenting a particular subject.
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
          <HomeOptions
            subject={selectedSubject}
            selectedOptions={selectedOptions}
            onSelectionChange={onOptionsChange}
            onPlanClick={handlePlanClick}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
