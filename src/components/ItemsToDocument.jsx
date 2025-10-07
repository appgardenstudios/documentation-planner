import { useState, useEffect, useRef, useMemo } from 'react';
import { filterItemsByAttributes, getCheckboxState } from '../utils/dataUtils';

// Separate component for items to avoid hooks issues
function Item({ item, parentPath, selectedItems, onCheckboxChange }) {
  const currentPath = parentPath ? `${parentPath}>${item.name}` : item.name;
  const hasChildren = item.items && item.items.length > 0;
  const checkboxState = getCheckboxState(item, selectedItems, currentPath);
  const isChecked = checkboxState === 'checked';
  const isIndeterminate = checkboxState === 'indeterminate';

  const checkboxRef = useRef(null);

  // Set indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <div className="ml-4">
      <label className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50">
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheckboxChange(currentPath, item, e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          aria-label={item.name}
        />
        <span className="text-sm text-gray-700">{item.name}</span>
      </label>

      {/* Render children if present */}
      {hasChildren && item.items.map(child => (
        <Item
          key={`${currentPath}>${child.name}`}
          item={child}
          parentPath={currentPath}
          selectedItems={selectedItems}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
}

export default function ItemsToDocument({
  items = [],
  selectedAttributes = [],
  selectedItems = [],
  onSelectionChange = () => {}
}) {
  // Track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  // Filter items based on selected attributes (memoized to prevent infinite loops)
  const filteredItems = useMemo(() => {
    return filterItemsByAttributes(items, selectedAttributes);
  }, [items, selectedAttributes]);

  // Initialize all categories as expanded when items or attributes change
  useEffect(() => {
    const allCategories = new Set(filteredItems.map(item => item.name));
    setExpandedCategories(allCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, selectedAttributes]);

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  const handleCheckboxChange = (path, item, isChecked) => {
    // If item has children, select/deselect all descendants
    if (item.items && item.items.length > 0) {
      const descendantPaths = [];

      const collectLeafPaths = (items, parentPath) => {
        for (const child of items) {
          const childPath = `${parentPath}>${child.name}`;
          if (child.items && child.items.length > 0) {
            collectLeafPaths(child.items, childPath);
          } else if (child.detail) {
            descendantPaths.push(childPath);
          }
        }
      };

      collectLeafPaths(item.items, path);

      if (isChecked) {
        // Add all descendants
        const newSelected = new Set([...selectedItems, ...descendantPaths]);
        onSelectionChange(Array.from(newSelected));
      } else {
        // Remove all descendants
        const newSelected = selectedItems.filter(p => !descendantPaths.includes(p));
        onSelectionChange(newSelected);
      }
    } else {
      // Leaf item - toggle its selection
      if (isChecked) {
        onSelectionChange([...selectedItems, path]);
      } else {
        onSelectionChange(selectedItems.filter(p => p !== path));
      }
    }
  };

  return (
    <div className="space-y-2">
      {filteredItems.map((category) => {
        const isExpanded = expandedCategories.has(category.name);

        return (
          <div key={category.name} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Category header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2 p-3">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex items-center gap-2 text-left font-medium text-gray-900 w-full cursor-pointer"
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
                  {category.name}
                </button>
              </div>
            </div>

            {/* Category items */}
            {isExpanded && category.items && (
              <div className="p-2">
                {category.items.map(item => (
                  <Item
                    key={`${category.name}>${item.name}`}
                    item={item}
                    parentPath={category.name}
                    selectedItems={selectedItems}
                    onCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
