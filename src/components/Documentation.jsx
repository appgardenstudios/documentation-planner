import { useState } from 'react';
import ItemsToDocument from './ItemsToDocument';
import DocumentsSection from './DocumentsSection';
import DocumentationOptionsModal from './DocumentationOptionsModal';
import Header from './Header';
import Footer from './Footer';
import { orderItems } from '../utils/documentUtils';

/**
 * Documentation component displays the main documentation planning interface.
 *
 * @param {object} props
 * @param {import('../data/index.js').Subject} props.subject - The subject being documented
 * @param {import('../hooks/useUrlState.js').SelectedOptions} props.selectedOptions - Selected options for the subject
 * @param {string[]} props.selectedItems - Array of selected item paths
 * @param {(items: string[]) => void} props.onItemsChange - Callback when selected items change
 * @param {(options: import('../hooks/useUrlState.js').SelectedOptions) => void} props.onOptionsChange - Callback when options change
 */
export default function Documentation({
  subject,
  selectedOptions = {},
  selectedItems = [],
  onItemsChange = () => {},
  onOptionsChange = () => {}
}) {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  if (!subject) return null;

  // Convert selectedOptions object to flat array of attribute values
  const selectedAttributesArray = Object.values(selectedOptions).flat();

  // Convert selected item paths to ordered item objects
  const orderedItems = orderItems(subject.items, selectedItems);

  // Format selected options for display
  const formatOptions = () => {
    const parts = [];
    Object.entries(selectedOptions).forEach(([question, values]) => {
      if (values && values.length > 0) {
        // Find the question object to get its label
        const questionObj = subject.questions.find(q => q.question === question);
        const category = questionObj?.label || 'Options';

        // Find the attribute names from values
        const attributeNames = [];
        if (questionObj) {
          questionObj.attributes.forEach(attr => {
            if (values.includes(attr.value)) {
              attributeNames.push(attr.name);
            }
          });
        }

        parts.push({ category, values: attributeNames.join(', ') });
      }
    });
    return parts;
  };

  const hasQuestions = subject.questions && subject.questions.length > 0;

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Sticky top navbar */}
      <Header sticky breadcrumb={subject.name} />

      {/* Selected options summary */}
      {hasQuestions && (
        <div className="border-b border-gray-200 px-6 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 tracking-wide mb-1">Repository Options</h2>
              <div className="text-sm text-gray-700">
                {formatOptions().map((option, idx) => (
                  <span key={idx}>
                    {idx > 0 && '; '}
                    <span className="font-bold">{option.category}:</span> {option.values}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsOptionsModalOpen(true)}
              className="p-1.5 text-gray-700 bg-white border border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 rounded transition-colors cursor-pointer"
              aria-label="Edit options"
              title="Edit options"
            >
              {/* Pencil icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main content area with side-by-side layout */}
      <main className="flex-1 lg:overflow-hidden overflow-auto">
        <div className="lg:h-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Items to document section */}
          <div className="flex flex-col lg:min-h-0">
            <h2 className="text-xs font-semibold text-gray-500 tracking-wide mb-2">Items to Document</h2>
            <div className="lg:flex-1 lg:overflow-auto border border-gray-200 rounded-lg p-4 bg-white">
              <ItemsToDocument
                items={subject.items}
                selectedAttributes={selectedAttributesArray}
                selectedItems={selectedItems}
                onSelectionChange={onItemsChange}
              />
            </div>
          </div>

          {/* Documents section */}
          <div className="flex flex-col lg:min-h-0">
            <h2 className="text-xs font-semibold text-gray-500 tracking-wide mb-2">Documents</h2>
            <div className="lg:flex-1 lg:overflow-auto border border-gray-200 rounded-lg p-4 bg-white">
              <DocumentsSection
                items={orderedItems}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Options modal */}
      <DocumentationOptionsModal
        isOpen={isOptionsModalOpen}
        subject={subject}
        selectedOptions={selectedOptions}
        onApply={(options) => {
          onOptionsChange(options);
          setIsOptionsModalOpen(false);
        }}
        onCancel={() => setIsOptionsModalOpen(false)}
      />
    </div>
  );
}
