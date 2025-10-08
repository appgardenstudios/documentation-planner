/**
 * Footer component with attribution and link
 *
 */
export default function Footer() {
  return (
    <footer role="contentinfo" className="py-3 px-4 text-sm text-gray-600 border-t border-gray-200">
      <div className="flex flex-wrap justify-between gap-2">
        <div>
          © 2025 App Garden Studios, LLC. All rights reserved.
        </div>
        <div>
          Built with ♥ by{' '}
          <a
            href="https://www.hyaline.dev"
            target="_blank"
            rel="noopener"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Hyaline.dev
          </a>
          {' '}- Keep your documentation up-to-date with each pull request.
        </div>
      </div>
    </footer>
  );
}
