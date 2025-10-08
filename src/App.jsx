import { useState, useEffect } from 'react';
import useUrlState from './hooks/useUrlState';
import subjects from './data';
import Home from './components/Home';
import Documentation from './components/Documentation';

/**
 * Get a subject by its name (case-insensitive)
 * @param {import('./data/index.js').Subject[]} subjects - Array of subject objects
 * @param {string} name - Name to search for
 * @returns {import('./data/index.js').Subject|null} - Subject object or null if not found
 */
function getSubjectByName(subjects, name) {
  if (!subjects || !name) return null;

  const lowerName = name.toLowerCase();
  return subjects.find(
    subject => subject.name.toLowerCase() === lowerName
  ) || null;
}

/**
 * Root application component that handles routing and state management
 */
export default function App() {
  const {
    subject: subjectName,
    selectedAttributes,
    selectedItems,
    setSubject,
    setSelectedAttributes,
    setSelectedItems,
    route
  } = useUrlState();

  const currentSubject = subjectName ? getSubjectByName(subjects, subjectName) : null;

  // Update page title based on route and subject
  useEffect(() => {
    if (route === 'documentation' && currentSubject) {
      document.title = `Documentation Planner - ${currentSubject.name}`;
    } else {
      document.title = 'Documentation Planner';
    }
  }, [route, currentSubject]);

  const handleSubjectSelect = (subjectName) => {
    setSubject(subjectName);
    setSelectedAttributes([]);
    setSelectedItems([]);
  };

  const handleAttributesChange = (attributes) => {
    setSelectedAttributes(attributes);
  };

  const handleItemsChange = (items) => {
    setSelectedItems(items);
  };

  if (route === 'documentation') {
    return (
      <Documentation
        subject={currentSubject}
        selectedAttributes={selectedAttributes}
        selectedItems={selectedItems}
        onItemsChange={handleItemsChange}
      />
    );
  }

  return (
    <Home
      subjects={subjects}
      selectedSubject={currentSubject}
      selectedAttributes={selectedAttributes}
      onSubjectSelect={handleSubjectSelect}
      onAttributesChange={handleAttributesChange}
    />
  );
}
