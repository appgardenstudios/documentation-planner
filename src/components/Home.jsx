import SubjectTiles from './SubjectTiles';
import HomeOptions from './HomeOptions';
import Header from './Header';
import Footer from './Footer';

export default function Home({
  subjects = [],
  selectedSubject = null,
  selectedOptions = {},
  onSubjectSelect = () => {},
  onOptionsChange = () => {}
}) {
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
      {/* Top Banner */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
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
