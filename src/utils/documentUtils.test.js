import {
  parseSectionHierarchy,
  getDocuments,
} from './documentUtils';

describe('documentUtils', () => {
  describe('parseSectionHierarchy', () => {
    test('parses simple section', () => {
      const result = parseSectionHierarchy('Introduction');
      expect(result).toEqual(['Introduction']);
    });

    test('parses nested sections with # separator', () => {
      const result = parseSectionHierarchy('Overview#Introduction#Background');
      expect(result).toEqual(['Overview', 'Introduction', 'Background']);
    });

    test('returns empty array for empty string', () => {
      const result = parseSectionHierarchy('');
      expect(result).toEqual([]);
    });

    test('returns empty array for null/undefined', () => {
      expect(parseSectionHierarchy(null)).toEqual([]);
      expect(parseSectionHierarchy(undefined)).toEqual([]);
    });
  });

  describe('getDocuments', () => {
    const mockItems = [
      {
        name: 'Core',
        items: [
          {
            name: 'Item1',
            detail: {
              purpose: 'Test',
              instructions: 'Instructions 1',
              document: 'README'
              // No section - goes to root items
            }
          },
          {
            name: 'Item2',
            detail: {
              purpose: 'Test',
              instructions: 'Instructions 2',
              document: 'README',
              section: 'Introduction'
            }
          },
          {
            name: 'Item3',
            detail: {
              purpose: 'Test',
              instructions: 'Instructions 3',
              document: 'README',
              section: 'Introduction#Background'
            }
          }
        ]
      }
    ];

    test('groups items by document', () => {
      const result = getDocuments(mockItems, ['Core > Item1', 'Core > Item2', 'Core > Item3']);
      expect(result).toHaveProperty('README');
    });

    test('places items without sections in items array', () => {
      const result = getDocuments(mockItems, ['Core > Item1', 'Core > Item2', 'Core > Item3']);
      expect(result.README.items).toHaveLength(1);
      expect(result.README.items[0].name).toBe('Item1');
    });

    test('creates section hierarchy', () => {
      const result = getDocuments(mockItems, ['Core > Item1', 'Core > Item2', 'Core > Item3']);
      expect(result.README.sections).toHaveProperty('Introduction');
      expect(result.README.sections.Introduction.items).toHaveLength(1);
    });

    test('creates nested section hierarchy', () => {
      const result = getDocuments(mockItems, ['Core > Item1', 'Core > Item2', 'Core > Item3']);
      expect(result.README.sections.Introduction.sections).toHaveProperty('Background');
      expect(result.README.sections.Introduction.sections.Background.items).toHaveLength(1);
    });

    test('includes path information', () => {
      const result = getDocuments(mockItems, ['Core > Item1']);
      expect(result.README.items[0].path).toBe('Core > Item1');
    });

    test('only includes selected items', () => {
      const result = getDocuments(mockItems, ['Core > Item1', 'Core > Item3']);
      expect(result.README.items.map(item => item.name)).toEqual(['Item1']);
      expect(result.README.sections.Introduction.sections.Background.items.map(item => item.name)).toEqual(['Item3']);
    });

    test('returns empty object when no items selected', () => {
      const result = getDocuments(mockItems, []);
      expect(result).toEqual({});
    });
  });
});
