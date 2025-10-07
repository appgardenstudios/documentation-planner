export default function Footer() {
  return (
    <footer role="contentinfo" className="py-3 text-center text-sm text-gray-600 border-t border-gray-200">
      Built with ♥ by{' '}
      <a
        href="https://www.hyaline.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 hover:underline"
      >
        Hyaline.dev
      </a>
      {' '}- Keep your documentation up-to-date with each pull request.
    </footer>
  );
}
