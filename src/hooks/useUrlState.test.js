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
      expect(result.current.selectedAttributes).toEqual([]);
      expect(result.current.selectedItems).toEqual([]);
    });

    test('parses subject from query param', () => {
      window.history.pushState({}, '', '?subject=repo');
      const { result } = renderHook(() => useUrlState());

      expect(result.current.subject).toBe('repo');
    });

    test('parses selected attributes from query params', () => {
      window.history.pushState({}, '', '?subject=repo&attributes=["INTERNAL","EXTERNAL","LIBRARY"]');
      const { result } = renderHook(() => useUrlState());

      expect(result.current.selectedAttributes).toEqual(['INTERNAL', 'EXTERNAL', 'LIBRARY']);
    });

    test('parses selected items from query param', () => {
      window.history.pushState({}, '', '?subject=repo&items=["Core > OneLiner","Marketing>Benefits"]');
      const { result } = renderHook(() => useUrlState());

      expect(result.current.selectedItems).toEqual(['Core > OneLiner', 'Marketing>Benefits']);
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

    test('updates selected attributes in URL', () => {
      window.history.pushState({}, '', '?subject=repo');
      const { result } = renderHook(() => useUrlState());

      act(() => {
        result.current.setSelectedAttributes(['INTERNAL']);
      });

      const params = new URLSearchParams(window.location.search);
      expect(params.get('attributes')).toBe('["INTERNAL"]');
    });

    test('updates selected items in URL', () => {
      window.history.pushState({}, '', '?subject=repo');
      const { result } = renderHook(() => useUrlState());

      act(() => {
        result.current.setSelectedItems(['Core > OneLiner']);
      });

      const params = new URLSearchParams(window.location.search);
      expect(params.get('items')).toBe('["Core > OneLiner"]');
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
    test('determines home route for root path', () => {
      window.history.pushState({}, '', '/');
      const { result } = renderHook(() => useUrlState());
      expect(result.current.route).toBe('home');
    });

    test('determines home route for root path with query params', () => {
      window.history.pushState({}, '', '/?subject=repo');
      const { result } = renderHook(() => useUrlState());
      expect(result.current.route).toBe('home');
    });

    test('determines documentation route for /documentation path', () => {
      window.history.pushState({}, '', '/documentation?subject=repo');
      const { result } = renderHook(() => useUrlState());
      expect(result.current.route).toBe('documentation');
    });
  });
});
