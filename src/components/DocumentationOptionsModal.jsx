import { useEffect, useState, useRef } from 'react';
import QuestionOptions from './QuestionOptions';

export default function DocumentationOptionsModal({
  isOpen = false,
  subject,
  selectedOptions = {},
  onApply = () => {},
  onCancel = () => {}
}) {
  const dialogRef = useRef(null);
  const [tempOptions, setTempOptions] = useState(selectedOptions);

  // Update temp options when selectedOptions changes
  useEffect(() => {
    setTempOptions(selectedOptions);
  }, [selectedOptions]);

  // Handle dialog open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Handle ESC key and backdrop click
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = (e) => {
      if (e.type === 'close' || e.type === 'cancel') {
        onCancel();
      }
    };

    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleClose);

    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleClose);
    };
  }, [onCancel]);

  const handleApply = () => {
    onApply(tempOptions);
  };

  const handleCancel = () => {
    setTempOptions(selectedOptions); // Reset to original
    onCancel();
  };

  // Check if at least one option is selected from at least one question
  const hasSelection = Object.values(tempOptions).some(values => values && values.length > 0);

  if (!isOpen || !subject) return null;

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg shadow-2xl p-0 max-w-2xl w-full my-auto mx-auto backdrop:bg-black/75"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="p-6">
        <h2 id="modal-title" className="text-2xl font-bold text-gray-900 mb-6">
          Please answer the following questions about the {subject.name.toLowerCase()} you are documenting.
        </h2>

        <QuestionOptions
          questions={subject.questions}
          selectedOptions={tempOptions}
          onSelectionChange={setTempOptions}
        />

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!hasSelection}
            className={`px-4 py-2 text-white rounded-lg transition-colors ${
              hasSelection
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Apply
          </button>
        </div>
      </div>
    </dialog>
  );
}
