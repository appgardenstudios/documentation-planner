/**
 * Utility functions for working with subject data and items
 */

/**
 * Get a subject by its name (case-insensitive)
 * @param {Array} subjects - Array of subject objects
 * @param {string} name - Name to search for
 * @returns {Object|null} - Subject object or null if not found
 */
export function getSubjectByName(subjects, name) {
  if (!subjects || !name) return null;

  const lowerName = name.toLowerCase();
  return subjects.find(
    subject => subject.name.toLowerCase() === lowerName
  ) || null;
}

/**
 * Check if an item matches the selected attributes
 * Items with no attributes always match
 * Items with attributes must have ALL attributes present in selectedAttributes
 *
 * @param {Object} item - Item to check
 * @param {Array<string>} selectedAttributes - List of selected attribute values
 * @returns {boolean} - True if item matches
 */
export function matchesAttributes(item, selectedAttributes) {
  // Parent items (no detail) always match
  if (!item.detail) return true;

  // Items with no attributes always match
  if (!item.detail.attributes || item.detail.attributes.length === 0) {
    return true;
  }

  // All item attributes must be in selectedAttributes
  return item.detail.attributes.every(
    attr => selectedAttributes.includes(attr)
  );
}

/**
 * Filter items tree by selected attributes
 * Returns a new tree with only matching items
 *
 * @param {Array} items - Items tree to filter
 * @param {Array<string>} selectedAttributes - List of selected attribute values
 * @returns {Array} - Filtered items tree
 */
export function filterItemsByAttributes(items, selectedAttributes) {
  if (!items || items.length === 0) return [];

  const filtered = [];

  for (const item of items) {
    // If item has children, recursively filter them
    if (item.items && item.items.length > 0) {
      const filteredChildren = filterItemsByAttributes(item.items, selectedAttributes);

      // Include parent only if it has matching children
      if (filteredChildren.length > 0) {
        filtered.push({
          ...item,
          items: filteredChildren
        });
      }
    } else {
      // Leaf node - include if it matches
      if (matchesAttributes(item, selectedAttributes)) {
        filtered.push(item);
      }
    }
  }

  return filtered;
}

/**
 * Traverse items tree in depth-first order
 *
 * @param {Array} items - Items tree to traverse
 * @param {Function} callback - Called for each item with (item, path)
 * @param {Array<string>} currentPath - Current path (for internal use)
 */
export function traverseDepthFirst(items, callback, currentPath = []) {
  if (!items) return;

  for (const item of items) {
    const path = [...currentPath, item.name];
    callback(item, path);

    if (item.items && item.items.length > 0) {
      traverseDepthFirst(item.items, callback, path);
    }
  }
}

/**
 * Get checkbox state for an item
 * - checked: all descendants are selected
 * - unchecked: no descendants are selected
 * - indeterminate: some descendants are selected
 *
 * @param {Object} item - Item to check
 * @param {Array<string>} selectedPaths - Array of selected item paths (e.g. ["Core>OneLiner"])
 * @param {string} currentPath - Current path for this item
 * @returns {string} - 'checked', 'unchecked', or 'indeterminate'
 */
export function getCheckboxState(item, selectedPaths, currentPath) {
  // For leaf items (no children), just check if selected
  if (!item.items || item.items.length === 0) {
    return selectedPaths.includes(currentPath) ? 'checked' : 'unchecked';
  }

  // For parent items, check children states
  const childStates = [];

  function checkChildren(items, parentPath) {
    for (const child of items) {
      const childPath = `${parentPath}>${child.name}`;

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
