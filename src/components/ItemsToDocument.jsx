import { useState, useEffect, useRef } from 'react';

/**
 * @typedef {import('../data/index.js').Item} Item
 */

/**
 * Get all matching item paths based on selected attributes
 * - Items WITHOUT attributes: Always matched
 * - Items WITH attributes: Matched only if ALL of the item's attributes are in selectedAttributes
 *
 * @param {Item[]} items - Tree of items
 * @param {string[]} selectedAttributes - Array of selected attributes
 * @returns {string[]} - Array of matching item paths
 */
function getMatchingItemPaths(items, selectedAttributes) {
  const matchingPaths = [];

  function traverse(items, parentPath = '') {
    for (const item of items) {
      const currentPath = parentPath ? `${parentPath} > ${item.name}` : item.name;

      // If item has detail (leaf node), check if it matches
      if (item.detail) {
        const itemAttributes = item.detail.attributes || [];

        // No attributes = always matches
        // Has attributes = all must be in selectedAttributes
        const matches = itemAttributes.length === 0 ||
          itemAttributes.every(attr => selectedAttributes.includes(attr));

        if (matches) {
          matchingPaths.push(currentPath);
        }
      }

      // Recursively process children
      if (item.items && item.items.length > 0) {
        traverse(item.items, currentPath);
      }
    }
  }

  traverse(items);
  return matchingPaths;
}

/**
 * Get checkbox state for an item
 * - checked: all descendants are selected
 * - unchecked: no descendants are selected
 * - indeterminate: some descendants are selected
 *
 * @param {Item} item - Item to check
 * @param {string[]} selectedPaths - Array of selected item paths
 * @param {string} currentPath - Current path for this item
 * @returns {'checked' | 'unchecked' | 'indeterminate'} - Checkbox state
 */
function getCheckboxState(item, selectedPaths, currentPath) {
  // For leaf items (no children), just check if selected
  if (!item.items || item.items.length === 0) {
    return selectedPaths.includes(currentPath) ? 'checked' : 'unchecked';
  }

  // For parent items, check children states
  const childStates = [];

  function checkChildren(items, parentPath) {
    for (const child of items) {
      const childPath = `${parentPath} > ${child.name}`;

      if (child.items && child.items.length > 0) {
        // Recursively check children
        checkChildren(child.items, childPath);
      } else {
        // Leaf item
        childStates.push(selectedPaths.includes(childPath));
      }
    }
  }

  checkChildren(item.items, currentPath);

  // Determine state based on children
  if (childStates.length === 0) return 'unchecked';

  const allSelected = childStates.every(state => state === true);
  const noneSelected = childStates.every(state => state === false);

  if (allSelected) return 'checked';
  if (noneSelected) return 'unchecked';
  return 'indeterminate';
}

/**
 * An Item
 *
 * @param {Object} props
 * @param {Item} props.item - Item to display
 * @param {string} props.parentPath - Parent path for building full item path
 * @param {string[]} props.selectedItems - Array of selected item paths
 * @param {(path: string, item: Item, checked: boolean) => void} props.onCheckboxChange - Callback when checkbox changes
 */
function Item({ item, parentPath, selectedItems, onCheckboxChange }) {
  const currentPath = parentPath ? `${parentPath} > ${item.name}` : item.name;
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

/**
 * Component for displaying a tree of items to document with checkboxes
 *
 * @param {Object} props
 * @param {Item[]} props.items - Tree of items to display
 * @param {string[]} props.selectedItems - Array of selected item paths
 * @param {string[]} props.selectedAttributes - Array of selected attributes
 * @param {(items: string[]) => void} props.onSelectionChange - Callback when selection changes

 */
export default function ItemsToDocument({
  items = [],
  selectedItems = [],
  selectedAttributes = [],
  onSelectionChange = () => {}
}) {
  // Track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  // Initialize all categories as expanded when items change
  useEffect(() => {
    const allCategories = new Set(items.map(item => item.name));
    setExpandedCategories(allCategories);
  }, [items]);

  // Auto-check items based on selected attributes on initial load only
  useEffect(() => {
    if (selectedItems.length === 0) {
      const matchingPaths = getMatchingItemPaths(items, selectedAttributes);
      if (matchingPaths.length > 0) {
        onSelectionChange(matchingPaths);
      }
    }
  }, []);

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
          const childPath = `${parentPath} > ${child.name}`;
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
      {items.map((category) => {
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
