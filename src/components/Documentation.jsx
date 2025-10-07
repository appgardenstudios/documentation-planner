import ItemsToDocument from './ItemsToDocument';
import DocumentsSection from './DocumentsSection';
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
  onItemsChange = () => {}
}) {

  if (!subject) return null;

  // Convert selectedOptions object to flat array of attribute values
  const selectedAttributesArray = Object.values(selectedOptions).flat();

  // Convert selected item paths to ordered item objects
  const orderedItems = orderItems(subject.items, selectedItems);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Navigation breadcrumb */}
      <Header sticky breadcrumb={subject.name} />

      {/* Main content area with side-by-side layout */}
      <main className="flex-1 lg:overflow-hidden overflow-auto">
        <div className="container max-w-screen-xl mx-auto lg:h-full flex flex-col lg:flex-row gap-6 py-5 px-6">
          {/* Items to document section */}
          <div className="flex flex-col lg:min-h-0 lg:w-96">
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
          <div className="flex flex-col lg:min-h-0 flex-1">
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
    </div>
  );
}
