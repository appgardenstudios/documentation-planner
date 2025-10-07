import Logo from '../assets/images/logo.svg';

export default function Header({ breadcrumb = null, sticky = false }) {
  const handleHomeClick = () => {
    // Clear all query parameters and go home
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const headerClasses = sticky
    ? "sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3"
    : "p-4";

  return (
    <header className={headerClasses}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Go to home page"
          >
            <img
              src={Logo}
              alt=""
              className={sticky ? "h-5 w-5" : "h-6 w-6"}
              aria-hidden="true"
            />
            {sticky ? (
              <span className="text-sm text-gray-600">Documentation Planner</span>
            ) : (
              <h1 className="text-lg font-semibold text-gray-900">Documentation Planner</h1>
            )}
          </button>
          {breadcrumb && (
            <>
              <span className="text-gray-400">›</span>
              <span className="text-sm font-medium text-gray-900">{breadcrumb}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
