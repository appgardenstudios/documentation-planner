import {
  parseSectionHierarchy,
  buildDocumentStructure,
  orderItems,
  generateMarkdown,
  groupItemsByDocument,
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

  describe('buildDocumentStructure', () => {
    const mockItems = [
      {
        name: 'Item1',
        path: 'Core>Item1',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions 1',
          document: 'README'
          // No section - goes to top
        }
      },
      {
        name: 'Item2',
        path: 'Core>Item2',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions 2',
          document: 'README',
          section: 'Introduction'
        }
      },
      {
        name: 'Item3',
        path: 'Core>Item3',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions 3',
          document: 'README',
          section: 'Introduction#Background'
        }
      }
    ];

    test('groups items by document', () => {
      const result = buildDocumentStructure(mockItems);
      expect(result).toHaveProperty('README');
    });

    test('places items without sections at top level', () => {
      const result = buildDocumentStructure(mockItems);
      expect(result.README.topLevel).toHaveLength(1);
      expect(result.README.topLevel[0].name).toBe('Item1');
    });

    test('creates section hierarchy', () => {
      const result = buildDocumentStructure(mockItems);
      expect(result.README.sections).toHaveProperty('Introduction');
      expect(result.README.sections.Introduction.items).toHaveLength(1);
    });

    test('creates nested section hierarchy', () => {
      const result = buildDocumentStructure(mockItems);
      expect(result.README.sections.Introduction.subsections).toHaveProperty('Background');
      expect(result.README.sections.Introduction.subsections.Background.items).toHaveLength(1);
    });
  });

  describe('orderItems', () => {
    const mockTree = [
      {
        name: 'Core',
        items: [
          {
            name: 'Item1',
            detail: {
              document: 'README',
              instructions: 'Test'
            }
          },
          {
            name: 'Item2',
            detail: {
              document: 'README',
              instructions: 'Test'
            }
          }
        ]
      },
      {
        name: 'Marketing',
        items: [
          {
            name: 'Item3',
            detail: {
              document: 'README',
              instructions: 'Test'
            }
          }
        ]
      }
    ];

    test('orders items in depth-first order', () => {
      const result = orderItems(mockTree, ['Core>Item1', 'Core>Item2', 'Marketing>Item3']);
      expect(result.map(item => item.name)).toEqual(['Item1', 'Item2', 'Item3']);
    });

    test('includes path information', () => {
      const result = orderItems(mockTree, ['Core>Item1']);
      expect(result[0].path).toBe('Core>Item1');
    });

    test('only includes selected items', () => {
      const result = orderItems(mockTree, ['Core>Item1', 'Marketing>Item3']);
      expect(result.map(item => item.name)).toEqual(['Item1', 'Item3']);
    });

    test('returns empty array when no items selected', () => {
      const result = orderItems(mockTree, []);
      expect(result).toEqual([]);
    });
  });

  describe('generateMarkdown', () => {
    test('generates markdown with instructions only', () => {
      const item = {
        name: 'TestItem',
        path: 'Core>TestItem',
        detail: {
          purpose: 'Test purpose',
          instructions: 'These are the instructions'
        }
      };
      const result = generateMarkdown(item);
      expect(result).toContain('These are the instructions');
      expect(result).not.toContain('Usage:');
    });

    test('includes usage when present', () => {
      const item = {
        name: 'TestItem',
        path: 'Core>TestItem',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions here',
          usage: 'This is how you use it'
        }
      };
      const result = generateMarkdown(item);
      expect(result).toContain('This is how you use it');
    });

    test('includes examples when present', () => {
      const item = {
        name: 'TestItem',
        path: 'Core>TestItem',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions',
          examples: [
            { example: 'Example 1' },
            { example: 'Example 2', reference: 'https://example.com' }
          ]
        }
      };
      const result = generateMarkdown(item);
      expect(result).toContain('Example: Example 1');
      expect(result).toContain('Example: Example 2');
      expect(result).toContain('https://example.com');
    });

    test('includes references when present', () => {
      const item = {
        name: 'TestItem',
        path: 'Core>TestItem',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions',
          references: ['https://ref1.com', 'https://ref2.com']
        }
      };
      const result = generateMarkdown(item);
      expect(result).toContain('[1]');
      expect(result).toContain('[2]');
      expect(result).toContain('https://ref1.com');
      expect(result).toContain('https://ref2.com');
    });

    test('generates complete template', () => {
      const item = {
        name: 'TestItem',
        path: 'Core>TestItem',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions',
          usage: 'Usage notes',
          examples: [{ example: 'Example text' }],
          references: ['https://ref.com']
        }
      };
      const result = generateMarkdown(item);
      expect(result).toContain('Instructions');
      expect(result).toContain('Usage notes');
      expect(result).toContain('Example: Example text');
      expect(result).toContain('[1]');
    });
  });

  describe('groupItemsByDocument', () => {
    const mockOrderedItems = [
      {
        name: 'Item1',
        path: 'Core>Item1',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions 1',
          document: 'README'
        }
      },
      {
        name: 'Item2',
        path: 'Core>Item2',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions 2',
          document: 'CONTRIBUTING'
        }
      },
      {
        name: 'Item3',
        path: 'Marketing>Item3',
        detail: {
          purpose: 'Test',
          instructions: 'Instructions 3',
          document: 'README'
        }
      }
    ];

    test('groups items by document name', () => {
      const result = groupItemsByDocument(mockOrderedItems);
      expect(Object.keys(result)).toContain('README');
      expect(Object.keys(result)).toContain('CONTRIBUTING');
    });

    test('maintains item order within documents', () => {
      const result = groupItemsByDocument(mockOrderedItems);
      expect(result.README.map(item => item.name)).toEqual(['Item1', 'Item3']);
    });

    test('returns empty object for empty array', () => {
      const result = groupItemsByDocument([]);
      expect(result).toEqual({});
    });
  });
});
