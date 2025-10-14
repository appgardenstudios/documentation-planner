import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';

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
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [show]);

  return (
    <dialog ref={dialogRef} onClose={onClose} className="mx-auto max-w-prose rounded-lg">
      <div className="border border-gray-200 rounded-lg bg-white">
        <div className="flex justify-between items-center px-4 pr-0 bg-gray-50 border-b border-gray-200">
          <span>{item.path}</span>
          <button autoFocus type="button" onClick={() => onClose()} className="py-2 px-4 cursor-pointer">X</button>
        </div>
        <div className="py-2 px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Purpose</h2>
          <div className="pl-3">{item.detail.purpose}</div>
          <h2 className="text-lg font-bold text-gray-900 mt-4 mb-1">Instructions</h2>
          <div className="pl-3">{item.detail.instructions}</div>
          <h2 className="text-lg font-bold text-gray-900 mt-4 mb-1">Guidance</h2>
          <div className="pl-3">
            <Markdown
              components={{
                strong(props) {
                  const {node, ...rest} = props
                  return <strong className="font-semibold text-base" {...rest} />
                },
                p(props) {
                  const {node, ...rest} = props
                  return <p className="mb-4" {...rest} />
                },
                ul(props) {
                  const {node, ...rest} = props
                  return <ul className="list-disc list-inside pl-4" {...rest} />
                },
              }}
            >{item.detail.guidance}</Markdown>
          </div>
          {item.detail.examples && (
            <>
              <h2 className="text-lg font-bold text-gray-900 mt-4 mb-1">Examples</h2>
              <div className="pl-3">
                {item.detail.examples.map((example) => (
                  <p className="mb-4">
                    {example.example}
                    {example.reference && (
                      <sup><a href={example.reference.link}>TODO arrow</a></sup>
                    )}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}