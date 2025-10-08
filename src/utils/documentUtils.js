/**
 * Utility functions for document rendering
 *
 * @typedef {import('../data/index.js').Item} Item
 * @typedef {import('../data/index.js').Detail} Detail
 */

/**
 * @typedef {Object} DocumentItem
 * @property {string} name - Item name
 * @property {string} path - Full path to item (e.g., "Category > Subcategory > Item")
 * @property {Detail} detail - Item detail object
 */

/**
 * @typedef {Object} DocumentSection
 * @property {DocumentItem[]} items - Items in this section
 * @property {Object<string, DocumentSection>} sections - Nested sections
 */

/**
 * Parse section hierarchy from "#" separated string
 * @param {string} section - Section string (e.g. "Overview#Introduction")
 * @returns {string[]} - Array of section names
 */
export function parseSectionHierarchy(section) {
  if (!section) return [];
  return section.split('#').filter(Boolean);
}

/**
 * Build documents from item tree
 * Traverses tree in depth-first order, filters by selected paths, and organizes into document sections
 *
 * @param {Item[]} items - Tree of items
 * @param {string[]} selectedPaths - Array of selected item paths
 * @returns {Object<string, DocumentSection>} - Document structure keyed by document name
 */
export function getDocuments(items, selectedPaths) {
  const documents = {};

  function traverse(items, parentPath = '') {
    for (const item of items) {
      const currentPath = parentPath ? `${parentPath} > ${item.name}` : item.name;

      // If item has detail (leaf node), check if selected
      if (item.detail && selectedPaths.includes(currentPath)) {
        const docName = item.detail.document;
        const documentItem = {
          ...item,
          path: currentPath
        };

        // Initialize document if needed
        if (!documents[docName]) {
          documents[docName] = {
            items: [],
            sections: {}
          };
        }

        // If no section, add to root items
        if (!item.detail.section) {
          documents[docName].items.push(documentItem);
        } else {
          // Parse section hierarchy and create nested structure
          const sectionParts = parseSectionHierarchy(item.detail.section);
          let currentLevel = documents[docName].sections;

          for (let i = 0; i < sectionParts.length; i++) {
            const part = sectionParts[i];
            const isLast = i === sectionParts.length - 1;

            // Initialize section if needed
            if (!currentLevel[part]) {
              currentLevel[part] = {
                items: [],
                sections: {}
              };
            }

            // If this is the last part, add the item
            if (isLast) {
              currentLevel[part].items.push(documentItem);
            } else {
              // Move to sections for next iteration
              currentLevel = currentLevel[part].sections;
            }
          }
        }
      }

      // Recursively process children
      if (item.items && item.items.length > 0) {
        traverse(item.items, currentPath);
      }
    }
  }

  traverse(items);
  return documents;
}
