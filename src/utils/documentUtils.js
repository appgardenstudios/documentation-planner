/**
 * Utility functions for document rendering
 */

/**
 * Parse section hierarchy from "#" separated string
 * @param {string} section - Section string (e.g. "Overview#Introduction")
 * @returns {Array<string>} - Array of section names
 */
export function parseSectionHierarchy(section) {
  if (!section) return [];
  return section.split('#').filter(Boolean);
}

/**
 * Build document structure from ordered items
 * Groups items by document and organizes them into sections
 *
 * @param {Array} items - Ordered items with paths
 * @returns {Object} - Document structure { docName: { topLevel: [], sections: {} } }
 */
export function buildDocumentStructure(items) {
  const structure = {};

  for (const item of items) {
    const docName = item.detail.document;

    // Initialize document if needed
    if (!structure[docName]) {
      structure[docName] = {
        topLevel: [],
        sections: {}
      };
    }

    // If no section, add to top level
    if (!item.detail.section) {
      structure[docName].topLevel.push(item);
      continue;
    }

    // Parse section hierarchy and create nested structure
    const sectionParts = parseSectionHierarchy(item.detail.section);
    let currentLevel = structure[docName].sections;

    for (let i = 0; i < sectionParts.length; i++) {
      const part = sectionParts[i];
      const isLast = i === sectionParts.length - 1;

      // Initialize section if needed
      if (!currentLevel[part]) {
        currentLevel[part] = {
          items: [],
          subsections: {}
        };
      }

      // If this is the last part, add the item
      if (isLast) {
        currentLevel[part].items.push(item);
      } else {
        // Move to subsections for next iteration
        currentLevel = currentLevel[part].subsections;
      }
    }
  }

  return structure;
}

/**
 * Order items from tree based on selected paths in depth-first order
 *
 * @param {Array} itemsTree - Tree of items
 * @param {Array<string>} selectedPaths - Array of selected item paths
 * @returns {Array} - Ordered array of items with paths
 */
export function orderItems(itemsTree, selectedPaths) {
  const orderedItems = [];

  function traverse(items, parentPath = '') {
    for (const item of items) {
      const currentPath = parentPath ? `${parentPath}>${item.name}` : item.name;

      // If item has detail (leaf node), check if selected
      if (item.detail) {
        if (selectedPaths.includes(currentPath)) {
          orderedItems.push({
            ...item,
            path: currentPath
          });
        }
      }

      // Recursively process children
      if (item.items && item.items.length > 0) {
        traverse(item.items, currentPath);
      }
    }
  }

  traverse(itemsTree);
  return orderedItems;
}

/**
 * Generate markdown for a single item
 * Template:
 * ${instructions}
 * ${usage} // if present
 * Example: ${examples} // if present, loop
 * ${references} // e.g. [1][2]
 *
 * @param {Object} item - Item with detail
 * @returns {string} - Markdown text
 */
export function generateMarkdown(item) {
  const parts = [];
  const { detail } = item;

  // Instructions (required)
  parts.push(detail.instructions);

  // Usage (optional)
  if (detail.usage) {
    parts.push('\n' + detail.usage);
  }

  // Examples (optional, can be multiple)
  if (detail.examples && detail.examples.length > 0) {
    for (const example of detail.examples) {
      let exampleText = `\nExample: ${example.example}`;
      if (example.reference) {
        exampleText += ` (${example.reference})`;
      }
      parts.push(exampleText);
    }
  }

  // References (optional)
  if (detail.references && detail.references.length > 0) {
    const refNumbers = detail.references.map((_, i) => `[${i + 1}]`).join('');
    parts.push(`\n${refNumbers}`);

    // Add reference URLs
    detail.references.forEach((ref, i) => {
      parts.push(`\n[${i + 1}]: ${ref}`);
    });
  }

  return parts.join('');
}

/**
 * Group ordered items by document name
 *
 * @param {Array} orderedItems - Ordered items with paths
 * @returns {Object} - Items grouped by document { docName: [items] }
 */
export function groupItemsByDocument(orderedItems) {
  const grouped = {};

  for (const item of orderedItems) {
    const docName = item.detail.document;

    if (!grouped[docName]) {
      grouped[docName] = [];
    }

    grouped[docName].push(item);
  }

  return grouped;
}
