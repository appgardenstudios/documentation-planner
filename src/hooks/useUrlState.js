import { useState, useEffect, useCallback } from 'react';

/**
 * @typedef {Object<string, string[]>} SelectedOptions
 * Selected options keyed by question, values are attribute values
 */

/**
 * @typedef {Object} UrlState
 * @property {string|null} subject - The current subject name
 * @property {SelectedOptions} selectedOptions - Selected options for the current subject
 * @property {string[]} selectedItems - Array of selected item paths
 * @property {'home'|'documentation'} route - The current route
 * @property {(subject: string) => void} setSubject - Update the subject
 * @property {(options: SelectedOptions) => void} setSelectedOptions - Update selected options
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
  const [selectedOptions, setSelectedOptionsState] = useState({});
  const [selectedItems, setSelectedItemsState] = useState([]);

  // Parse URL on initial mount and when URL changes
  useEffect(() => {
    const parseUrl = () => {
      const params = new URLSearchParams(window.location.search);

      // Parse subject
      const subjectParam = params.get('subject');
      setSubjectState(subjectParam);

      // Parse selected options (all params except 'subject' and 'items')
      const options = {};
      params.forEach((value, key) => {
        if (key !== 'subject' && key !== 'items') {
          try {
            options[key] = JSON.parse(value);
          } catch {
            // If not valid JSON, treat as single value
            options[key] = [value];
          }
        }
      });
      setSelectedOptionsState(options);

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

  const setSelectedOptions = useCallback((newOptions) => {
    setSelectedOptionsState(newOptions);

    // Update each option key in the URL
    const updates = {};
    Object.entries(newOptions).forEach(([key, value]) => {
      updates[key] = value;
    });
    updateUrl(updates);
  }, [updateUrl]);

  const setSelectedItems = useCallback((newItems) => {
    setSelectedItemsState(newItems);
    updateUrl({ items: newItems });
  }, [updateUrl]);

  // Determine current route based on 'planned' query parameter
  // Users click "Plan My Documentation" to set this flag
  const params = new URLSearchParams(window.location.search);
  const planned = params.get('planned') === 'true';
  const route = subject && planned ? 'documentation' : 'home';

  return {
    subject,
    selectedOptions,
    selectedItems,
    route,
    setSubject,
    setSelectedOptions,
    setSelectedItems,
  };
}

export default useUrlState;
