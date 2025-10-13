import { useState, useEffect, useRef, useMemo } from 'react';
import { getDocuments } from '../utils/documentUtils';
import Information from './Information';

/**
 * Component for rendering a single documentation item
 *
 * @typedef {import('../utils/documentUtils.js').DocumentItem} DocumentItem
 *
 * @param {Object} props
 * @param {DocumentItem} props.item - Item to document
 */
function DocumentItem({ item }) {
  const [showDialog, setShowDialog] = useState(false);


  return (
    <div className="mb-4 relative">
      <div className="border-2 border-dashed border-gray-300 rounded p-4 relative">
        <div className="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500 flex items-center h-5">
          {item.path}
        </div>
        {item.detail.guidance && (
          <>
            <div className="absolute top-1 right-1 text-xs text-gray-500 cursor-pointer" onClick={() => setShowDialog(true)}>
              ( i )
            </div>
            <Information show={showDialog} onClose={() => setShowDialog(false)} item={item}></Information>
          </>
        )}
        <div className="text-sm text-gray-700">
          <div>{item.detail.instructions}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Component for displaying generated documentation organized by document
 *
 * @param {Object} props
 * @param {import('../data/index.js').Subject} props.subject - The subject being documented
 * @param {string[]} props.selectedItems - Array of selected item paths

 */
export default function Documents({ subject, selectedItems = [] }) {
  const [expandedDocs, setExpandedDocs] = useState(new Set());
  const [copiedDoc, setCopiedDoc] = useState(null);
  const copyTimeoutRef = useRef(null);

  const documents = useMemo(
    () => getDocuments(subject.items, selectedItems),
    [subject.items, selectedItems]
  );

  // Get ordered document names from subject.documents
  // Any unlisted documents are appended at the end
  const orderedDocNames = useMemo(() => {
    if (!subject.documents || subject.documents.length === 0) {
      return Object.keys(documents);
    }

    const orderedNames = subject.documents
      .map(doc => doc.name)
      .filter(name => documents[name]);

    // Find any documents that aren't in the ordered list
    const allDocNames = Object.keys(documents);
    const unlistedDocs = allDocNames.filter(name => !orderedNames.includes(name));

    return [...orderedNames, ...unlistedDocs];
  }, [subject.documents, documents]);

  // Initialize all docs as expanded
  useEffect(() => {
    if (selectedItems && selectedItems.length > 0) {
      setExpandedDocs(new Set(Object.keys(documents)));
    }
  }, [selectedItems, documents]);

  if (!selectedItems || selectedItems.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-500">No items selected yet.</p>
      </div>
    );
  }

  /**
   * Toggle document expansion state
   * @param {string} docName - Name of document to toggle
   */
  const toggleDoc = (docName) => {
    setExpandedDocs(prev => {
      const next = new Set(prev);
      if (next.has(docName)) {
        next.delete(docName);
      } else {
        next.add(docName);
      }
      return next;
    });
  };

  /**
   * Generate markdown string for a document
   * @param {string} docName - Name of document to generate markdown for
   * @returns {string} Markdown string
   */
  const generateDocumentMarkdown = (docName) => {
    const document = documents[docName];
    const parts = [];

    // Add root items first
    if (document.items && document.items.length > 0) {
      document.items.forEach(item => {
        parts.push(item.detail.instructions.trim());
        parts.push('\n\n');
      });
    }

    /**
     * Recursively render sections as markdown
     * @param {Object<string, import('../utils/documentUtils.js').DocumentSection>} sections - Sections to render
     * @param {number} level - Current heading level (1 = h1, 2 = h2, etc.)
     */
    const renderSection = (sections, level = 1) => {
      Object.entries(sections).forEach(([sectionName, section]) => {
        // Add section header
        const headerPrefix = '#'.repeat(level);
        parts.push(`${headerPrefix} ${sectionName}\n\n`);

        // Add items in this section
        if (section.items && section.items.length > 0) {
          section.items.forEach(item => {
            parts.push(item.detail.instructions.trim());
            parts.push('\n\n');
          });
        }

        // Recursively render sections
        if (section.sections && Object.keys(section.sections).length > 0) {
          renderSection(section.sections, level + 1);
        }
      });
    };

    if (document.sections && Object.keys(document.sections).length > 0) {
      renderSection(document.sections);
    }

    return parts.join('').trim();
  };

  /**
   * Copy document markdown to clipboard
   * @param {string} docName - Name of document to copy
   */
  const copyToClipboard = async (docName) => {
    const markdown = generateDocumentMarkdown(docName);
    try {
      await navigator.clipboard.writeText(markdown);

      // Clear any existing timeout
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      setCopiedDoc(docName);

      // Store the new timeout ID
      copyTimeoutRef.current = setTimeout(() => {
        setCopiedDoc(null);
        copyTimeoutRef.current = null;
      }, 4000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  /**
   * Render section content as JSX
   * @param {Object<string, import('../utils/documentUtils.js').DocumentSection>} sections - Sections to render
   * @param {number} level - Current heading level (1 = h1, 2 = h2, etc.)
   * @returns {JSX.Element[]} Array of section elements
   */
  const renderSectionContent = (sections, level = 1) => {
    return Object.entries(sections).map(([sectionName, section]) => {
      const HeaderTag = `h${Math.min(level, 6)}`;
      const headerPrefix = '#'.repeat(level);

      return (
        <div key={sectionName} className="mb-4">
          <HeaderTag className={`font-semibold text-gray-900 mb-2 ${
            level === 1 ? 'text-xl font-bold' : level === 2 ? 'text-base' : level === 3 ? 'text-sm' : 'text-xs'
          }`}>
            <span className="text-gray-400 mr-2">{headerPrefix}</span>
            {sectionName}
          </HeaderTag>

          {/* Items in this section */}
          {section.items && section.items.map(item => (
            <DocumentItem key={item.path} item={item} />
          ))}

          {/* Nested sections */}
          {section.sections && Object.keys(section.sections).length > 0 && (
            <div>
              {renderSectionContent(section.sections, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      {orderedDocNames.map(docName => {
        const isExpanded = expandedDocs.has(docName);
        const document = documents[docName];

        return (
          <div key={docName} className="border border-gray-200 rounded-lg">
            {/* Document header */}
            <div className={`bg-gray-50 border-b border-gray-200 flex items-center justify-between ${isExpanded ? 'rounded-t-lg' : 'rounded-lg'}`}>
              <button
                onClick={() => toggleDoc(docName)}
                className="flex-1 flex items-center gap-2 text-left font-medium text-gray-900 p-3 cursor-pointer"
                aria-expanded={isExpanded}
              >
                <svg
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {docName}
              </button>

              <div className="relative p-2 mr-2">
                <button
                  onClick={() => copyToClipboard(docName)}
                  className="p-1.5 rounded transition-colors cursor-pointer text-gray-700 bg-white border border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                  title="Copy as Markdown"
                  aria-label="Copy as Markdown"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                </button>
                {copiedDoc === docName && (
                  <div className="absolute top-full right-0 mt-1 px-2 py-1 bg-green-50 border border-green-200 rounded shadow-sm z-10 flex items-center">
                    <span className="text-xs text-green-600 whitespace-nowrap leading-none">Copied to clipboard</span>
                  </div>
                )}
              </div>
            </div>

            {/* Document content */}
            {isExpanded && (
              <article className="p-4">
                {/* Root items */}
                {document.items && document.items.length > 0 && (
                  <div className="mb-6">
                    {document.items.map(item => (
                      <DocumentItem key={item.path} item={item} />
                    ))}
                  </div>
                )}

                {/* Sections */}
                {document.sections && Object.keys(document.sections).length > 0 && (
                  <div>
                    {renderSectionContent(document.sections)}
                  </div>
                )}
              </article>
            )}
          </div>
        );
      })}
    </div>
  );
}
