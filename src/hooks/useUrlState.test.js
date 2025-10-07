import { renderHook, act } from '@testing-library/react';
import useUrlState from './useUrlState';

beforeEach(() => {
  // Reset to clean state
  window.history.pushState({}, '', '/');
});

describe('useUrlState', () => {
  describe('parsing URL query params', () => {
    test('returns empty state when no query params present', () => {
      const { result } = renderHook(() => useUrlState());

      expect(result.current.subject).toBeNull();
      expect(result.current.selectedOptions).toEqual({});
      expect(result.current.selectedItems).toEqual([]);
    });

    test('parses subject from query param', () => {
      window.history.pushState({}, '', '?subject=repo');
      const { result } = renderHook(() => useUrlState());

      expect(result.current.subject).toBe('repo');
    });

    test('parses selected options from query params', () => {
      window.history.pushState({}, '', '?subject=repo&visibility=["Internal","External"]&type=["Library"]');
      const { result } = renderHook(() => useUrlState());

      expect(result.current.selectedOptions).toEqual({
        visibility: ['Internal', 'External'],
        type: ['Library']
      });
    });

    test('parses selected items from query param', () => {
      window.history.pushState({}, '', '?subject=repo&items=["Core>OneLiner","Marketing>Benefits"]');
      const { result } = renderHook(() => useUrlState());

      expect(result.current.selectedItems).toEqual(['Core>OneLiner', 'Marketing>Benefits']);
    });

    test('handles malformed JSON gracefully', () => {
      window.history.pushState({}, '', '?subject=repo&items=invalid-json');
      const { result } = renderHook(() => useUrlState());

      expect(result.current.selectedItems).toEqual([]);
    });
  });

  describe('updating URL state', () => {
    test('updates subject in URL', () => {
      const { result } = renderHook(() => useUrlState());

      act(() => {
        result.current.setSubject('system');
      });

      expect(window.location.search).toContain('subject=system');
    });

    test('updates selected options in URL', () => {
      window.history.pushState({}, '', '?subject=repo');
      const { result } = renderHook(() => useUrlState());

      act(() => {
        result.current.setSelectedOptions({ visibility: ['Internal'] });
      });

      const params = new URLSearchParams(window.location.search);
      expect(params.get('visibility')).toBe('["Internal"]');
    });

    test('updates selected items in URL', () => {
      window.history.pushState({}, '', '?subject=repo');
      const { result } = renderHook(() => useUrlState());

      act(() => {
        result.current.setSelectedItems(['Core>OneLiner']);
      });

      const params = new URLSearchParams(window.location.search);
      expect(params.get('items')).toBe('["Core>OneLiner"]');
    });

    test('clears subject when set to null', () => {
      window.history.pushState({}, '', '?subject=repo');
      const { result } = renderHook(() => useUrlState());

      act(() => {
        result.current.setSubject(null);
      });

      const params = new URLSearchParams(window.location.search);
      expect(params.has('subject')).toBe(false);
    });
  });

  describe('initial route determination', () => {
    test('determines home route when no subject', () => {
      const { result } = renderHook(() => useUrlState());
      expect(result.current.route).toBe('home');
    });

    test('determines home route when subject is present but not planned', () => {
      window.history.pushState({}, '', '?subject=repo');
      const { result } = renderHook(() => useUrlState());
      expect(result.current.route).toBe('home');
    });

    test('determines documentation route when subject is present and planned=true', () => {
      window.history.pushState({}, '', '?subject=repo&planned=true');
      const { result } = renderHook(() => useUrlState());
      expect(result.current.route).toBe('documentation');
    });
  });
});
