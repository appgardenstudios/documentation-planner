import { useState, useEffect, useCallback } from 'react';

/**
 * @typedef {string[]} SelectedAttributes
 * Array of selected attribute values
 */

/**
 * @typedef {Object} UrlState
 * @property {string|null} subject - The current subject name
 * @property {SelectedAttributes} selectedAttributes - Selected attributes for the current subject
 * @property {string[]} selectedItems - Array of selected item paths
 * @property {'home'|'documentation'} route - The current route
 * @property {(subject: string) => void} setSubject - Update the subject
 * @property {(attributes: SelectedAttributes) => void} setSelectedAttributes - Update selected attributes
 * @property {(items: string[]) => void} setSelectedItems - Update selected items
 */

/**
 * Hook for managing application state via URL query parameters
 * Enables bookmarking and sharing of specific documentation plans
 *
 * @returns {UrlState}
 */
export function useUrlState() {
  const [subject, setSubjectState] = useState(null);
  const [selectedAttributes, setSelectedAttributesState] = useState([]);
  const [selectedItems, setSelectedItemsState] = useState([]);

  // Parse URL on initial mount and when URL changes
  useEffect(() => {
    const parseUrl = () => {
      const params = new URLSearchParams(window.location.search);

      // Parse subject
      const subjectParam = params.get('subject');
      setSubjectState(subjectParam);

      // Parse selected attributes
      const attributesParam = params.get('attributes');
      if (attributesParam) {
        try {
          const attributes = JSON.parse(attributesParam);
          setSelectedAttributesState(Array.isArray(attributes) ? attributes : []);
        } catch {
          setSelectedAttributesState([]);
        }
      } else {
        setSelectedAttributesState([]);
      }

      // Parse selected items
      const itemsParam = params.get('items');
      if (itemsParam) {
        try {
          const items = JSON.parse(itemsParam);
          setSelectedItemsState(Array.isArray(items) ? items : []);
        } catch {
          setSelectedItemsState([]);
        }
      } else {
        setSelectedItemsState([]);
      }
    };

    parseUrl();

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', parseUrl);
    return () => window.removeEventListener('popstate', parseUrl);
  }, []);

  // Update URL when state changes
  const updateUrl = useCallback((updates) => {
    const params = new URLSearchParams(window.location.search);

    // Apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key);
      } else if (Array.isArray(value) || typeof value === 'object') {
        params.set(key, JSON.stringify(value));
      } else {
        params.set(key, value);
      }
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, []);

  const setSubject = useCallback((newSubject) => {
    setSubjectState(newSubject);
    updateUrl({ subject: newSubject });
  }, [updateUrl]);

  const setSelectedAttributes = useCallback((newAttributes) => {
    setSelectedAttributesState(newAttributes);
    updateUrl({ attributes: newAttributes });
  }, [updateUrl]);

  const setSelectedItems = useCallback((newItems) => {
    setSelectedItemsState(newItems);
    updateUrl({ items: newItems });
  }, [updateUrl]);

  // Determine current route based on URL path
  const route = window.location.pathname === '/documentation' ? 'documentation' : 'home';

  return {
    subject,
    selectedAttributes,
    selectedItems,
    route,
    setSubject,
    setSelectedAttributes,
    setSelectedItems,
  };
}

export default useUrlState;
