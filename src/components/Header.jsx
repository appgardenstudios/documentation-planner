import Logo from '../assets/images/logo.svg';
import GitHubIcon from '../assets/images/github.svg';

/**
 * Header component with logo, title, and optional breadcrumb
 *
 * @param {Object} props
 * @param {string|null} props.breadcrumb - Optional breadcrumb text to display

 */
export default function Header({ breadcrumb = null }) {
  const handleHomeClick = () => {
    // Clear all query parameters and go home
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
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
              className="h-5 w-5"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-600">Documentation Planner</span>
          </button>
          {breadcrumb && (
            <>
              <span className="text-gray-400">›</span>
              <span className="text-sm font-medium text-gray-900">{breadcrumb}</span>
            </>
          )}
        </div>
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
    </header>
  );
}
