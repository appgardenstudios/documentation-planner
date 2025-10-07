import ItemsToDocument from './ItemsToDocument';
import Documents from './Documents';
import Header from './Header';
import Footer from './Footer';

/**
 * Documentation component displays the main documentation planning interface.
 *
 * @param {object} props
 * @param {import('../data/index.js').Subject} props.subject - The subject being documented
 * @param {import('../hooks/useUrlState.js').SelectedAttributes} props.selectedAttributes - Selected attributes for the subject
 * @param {string[]} props.selectedItems - Array of selected item paths
 * @param {(items: string[]) => void} props.onItemsChange - Callback when selected items change
 */
export default function Documentation({
  subject,
  selectedAttributes = [],
  selectedItems = [],
  onItemsChange = () => {}
}) {

  if (!subject) return null;

  return (
    <div className="min-h-screen lg:h-screen bg-white flex flex-col lg:overflow-hidden">
      <Header breadcrumb={subject.name} />

      {/* Main content area with side-by-side layout */}
      <main className="flex-1 lg:overflow-hidden">
        <div className="container max-w-screen-xl mx-auto lg:h-full flex flex-col lg:flex-row gap-6 py-5 px-6">
          {/* Items to document section */}
          <div className="flex flex-col lg:min-h-0 lg:w-96">
            <h2 className="text-xs font-semibold text-gray-500 tracking-wide mb-2">Items to Document</h2>
            <div className="lg:flex-1 lg:overflow-auto border border-gray-200 rounded-lg p-4 bg-white">
              <ItemsToDocument
                items={subject.items}
                selectedItems={selectedItems}
                selectedAttributes={selectedAttributes}
                onSelectionChange={onItemsChange}
              />
            </div>
          </div>

          {/* Documents section */}
          <div className="flex flex-col lg:min-h-0 flex-1">
            <h2 className="text-xs font-semibold text-gray-500 tracking-wide mb-2">Documents</h2>
            <div className="lg:flex-1 lg:overflow-auto border border-gray-200 rounded-lg p-4 bg-white">
              <Documents
                subject={subject}
                selectedItems={selectedItems}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
