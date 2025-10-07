import { useState, useEffect } from 'react';
import useUrlState from './hooks/useUrlState';
import subjects from './data';
import Home from './components/Home';
import Documentation from './components/Documentation';
import { getSubjectByName } from './utils/dataUtils';

export default function App() {
  const {
    subject: subjectName,
    selectedOptions,
    selectedItems,
    setSubject,
    setSelectedOptions,
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
    setSelectedOptions({});
    setSelectedItems([]);
  };

  const handleOptionsChange = (options) => {
    setSelectedOptions(options);
  };

  const handleItemsChange = (items) => {
    setSelectedItems(items);
  };

  if (route === 'documentation') {
    return (
      <Documentation
        subject={currentSubject}
        selectedOptions={selectedOptions}
        selectedItems={selectedItems}
        onItemsChange={handleItemsChange}
        onOptionsChange={setSelectedOptions}
      />
    );
  }

  return (
    <Home
      subjects={subjects}
      selectedSubject={currentSubject}
      selectedOptions={selectedOptions}
      onSubjectSelect={handleSubjectSelect}
      onOptionsChange={handleOptionsChange}
    />
  );
}
