import { useState, useEffect, useRef, useMemo } from 'react';
/**
 * Information component
 * 
 * @typedef {import('../utils/documentUtils.js').DocumentItem} DocumentItem
 *
 * @param {Object} props
 * @param {DocumentItem} props.item - Item to document
 */
export default function Information({ show, onClose, item }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (show) {
        dialogRef.current.showModal(); // For a modal dialog
      } else {
        dialogRef.current.close();
      }
    }
  }, [show]);

  return (
    <dialog ref={dialogRef} onClose={onClose} className="mx-auto">
      <button autoFocus type="button" onClick={() => onClose()}>Close</button>
      <div>{item.detail.purpose}</div>
      <div>{item.detail.instructions}</div>
      <div>{item.detail.guidance}</div>
    </dialog>
  );
}