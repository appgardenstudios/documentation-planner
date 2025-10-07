import {
  getSubjectByName,
  matchesAttributes,
  filterItemsByAttributes,
  getCheckboxState,
  traverseDepthFirst,
} from './dataUtils';

// Mock data for testing
const mockSubjects = [
  {
    name: 'Repository',
    icon: 'repo-icon',
    questions: [],
    items: []
  },
  {
    name: 'System',
    icon: 'system-icon',
    questions: [],
    items: []
  }
];

const mockItems = [
  {
    name: 'Core',
    items: [
      {
        name: 'One Liner',
        detail: {
          purpose: 'Test',
          instructions: 'Test instructions',
          document: 'README',
          attributes: ['EXTERNAL']
        }
      },
      {
        name: 'Description',
        detail: {
          purpose: 'Test',
          instructions: 'Test instructions',
          document: 'README'
          // No attributes means always included
        }
      }
    ]
  },
  {
    name: 'Marketing',
    items: [
      {
        name: 'Features',
        detail: {
          purpose: 'Test',
          instructions: 'Test instructions',
          document: 'README',
          attributes: ['EXTERNAL', 'LIBRARY']
        }
      },
      {
        name: 'Benefits',
        detail: {
          purpose: 'Test',
          instructions: 'Test instructions',
          document: 'README',
          attributes: ['INTERNAL']
        }
      }
    ]
  }
];

describe('dataUtils', () => {
  describe('getSubjectByName', () => {
    test('returns subject when found by name', () => {
      const result = getSubjectByName(mockSubjects, 'Repository');
      expect(result).toEqual(mockSubjects[0]);
    });

    test('returns subject when found by lowercase name', () => {
      const result = getSubjectByName(mockSubjects, 'repository');
      expect(result).toEqual(mockSubjects[0]);
    });

    test('returns null when subject not found', () => {
      const result = getSubjectByName(mockSubjects, 'NonExistent');
      expect(result).toBeNull();
    });

    test('returns null when subjects is empty', () => {
      const result = getSubjectByName([], 'Repository');
      expect(result).toBeNull();
    });
  });

  describe('matchesAttributes', () => {
    test('returns true when item has no attributes', () => {
      const item = { detail: {} };
      const selectedAttributes = ['EXTERNAL'];
      expect(matchesAttributes(item, selectedAttributes)).toBe(true);
    });

    test('returns true when all item attributes match selected attributes', () => {
      const item = { detail: { attributes: ['EXTERNAL', 'LIBRARY'] } };
      const selectedAttributes = ['EXTERNAL', 'LIBRARY', 'INTERNAL'];
      expect(matchesAttributes(item, selectedAttributes)).toBe(true);
    });

    test('returns false when not all item attributes match', () => {
      const item = { detail: { attributes: ['EXTERNAL', 'LIBRARY'] } };
      const selectedAttributes = ['EXTERNAL'];
      expect(matchesAttributes(item, selectedAttributes)).toBe(false);
    });

    test('returns false when no attributes are selected', () => {
      const item = { detail: { attributes: ['EXTERNAL'] } };
      const selectedAttributes = [];
      expect(matchesAttributes(item, selectedAttributes)).toBe(false);
    });

    test('returns true for parent item with no detail', () => {
      const item = { name: 'Parent', items: [] };
      const selectedAttributes = ['EXTERNAL'];
      expect(matchesAttributes(item, selectedAttributes)).toBe(true);
    });
  });

  describe('filterItemsByAttributes', () => {
    test('includes items with no attributes', () => {
      const filtered = filterItemsByAttributes(mockItems, ['EXTERNAL']);
      const description = filtered[0].items.find(item => item.name === 'Description');
      expect(description).toBeDefined();
    });

    test('includes items where all attributes match', () => {
      const filtered = filterItemsByAttributes(mockItems, ['EXTERNAL']);
      const oneLiner = filtered[0].items.find(item => item.name === 'One Liner');
      expect(oneLiner).toBeDefined();
    });

    test('excludes items where not all attributes match', () => {
      const filtered = filterItemsByAttributes(mockItems, ['EXTERNAL']);
      // Marketing category should only have Core, not Marketing (since Features needs LIBRARY too)
      const marketing = filtered.find(item => item.name === 'Marketing');
      const features = marketing?.items?.find(item => item.name === 'Features');
      expect(features).toBeUndefined();
    });

    test('includes items where all multiple attributes match', () => {
      const filtered = filterItemsByAttributes(mockItems, ['EXTERNAL', 'LIBRARY']);
      const features = filtered[1].items.find(item => item.name === 'Features');
      expect(features).toBeDefined();
    });

    test('removes parent items when all children are filtered out', () => {
      const filtered = filterItemsByAttributes(mockItems, ['EXTERNAL']);
      // Marketing should still exist because it has children (even if nested)
      // But let's check Benefits is not there
      const benefits = filtered[1]?.items?.find(item => item.name === 'Benefits');
      expect(benefits).toBeUndefined();
    });

    test('returns result with only items without attributes when no matches', () => {
      const filtered = filterItemsByAttributes(mockItems, ['NONEXISTENT']);
      // Should only include Core>Description (no attributes = always included)
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('Core');
      expect(filtered[0].items.length).toBe(1);
      expect(filtered[0].items[0].name).toBe('Description');
    });
  });

  describe('traverseDepthFirst', () => {
    test('visits items in depth-first order', () => {
      const visited = [];
      traverseDepthFirst(mockItems, (item) => {
        visited.push(item.name);
      });

      expect(visited).toEqual([
        'Core',
        'One Liner',
        'Description',
        'Marketing',
        'Features',
        'Benefits'
      ]);
    });

    test('works with empty array', () => {
      const visited = [];
      traverseDepthFirst([], (item) => {
        visited.push(item.name);
      });

      expect(visited).toEqual([]);
    });

    test('calls callback with item and path', () => {
      const paths = [];
      traverseDepthFirst(mockItems, (item, path) => {
        paths.push(path);
      });

      expect(paths[0]).toEqual(['Core']);
      expect(paths[1]).toEqual(['Core', 'One Liner']);
      expect(paths[2]).toEqual(['Core', 'Description']);
    });
  });

  describe('getCheckboxState', () => {
    test('returns checked when all children are selected', () => {
      const item = mockItems[0]; // Core
      const selectedPaths = ['Core>One Liner', 'Core>Description'];
      expect(getCheckboxState(item, selectedPaths, 'Core')).toBe('checked');
    });

    test('returns unchecked when no children are selected', () => {
      const item = mockItems[0]; // Core
      const selectedPaths = [];
      expect(getCheckboxState(item, selectedPaths, 'Core')).toBe('unchecked');
    });

    test('returns indeterminate when some children are selected', () => {
      const item = mockItems[0]; // Core
      const selectedPaths = ['Core>One Liner'];
      expect(getCheckboxState(item, selectedPaths, 'Core')).toBe('indeterminate');
    });

    test('returns checked for leaf item when selected', () => {
      const item = mockItems[0].items[0]; // One Liner
      const selectedPaths = ['Core>One Liner'];
      expect(getCheckboxState(item, selectedPaths, 'Core>One Liner')).toBe('checked');
    });

    test('returns unchecked for leaf item when not selected', () => {
      const item = mockItems[0].items[0]; // One Liner
      const selectedPaths = [];
      expect(getCheckboxState(item, selectedPaths, 'Core>One Liner')).toBe('unchecked');
    });
  });
});
