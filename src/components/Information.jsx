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
    <dialog ref={dialogRef} onClose={onClose} className="m-auto max-w-prose h-full max-h-[calc(100dvh-64px)] rounded-lg">
      <div className="flex flex-col h-full border border-gray-200 rounded-lg bg-white">
        <div className="flex justify-between items-center pl-4 pr-1 py-1 bg-gray-50 border-b border-gray-200">
          <span>{item.path}</span>
          <button autoFocus type="button" onClick={onClose} className="py-2 px-4 cursor-pointer">X</button>
        </div>
        <div className="py-2 px-4 h-full overflow-y-auto">
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
                {item.detail.examples.map((example, idx) => (
                  <p key={idx} className="mb-4">
                    {example.example}
                    {example.reference && (
                      <sup><a
                        href={example.reference.link}
                        className="underline"
                        target="_blank"
                        rel="noopener"
                      >TODO arrow</a></sup>
                    )}
                  </p>
                ))}
              </div>
            </>
          )}
          {item.detail.references && (
            <>
              <h2 className="text-lg font-bold text-gray-900 mt-4 mb-1">References</h2>
              <div className="pl-3">
                <ul className="list-disc list-inside pl-4">
                {item.detail.references.map((reference, idx) => (
                  <li key={idx}><a
                    className="underline"
                    href={reference.link}
                    target="_blank"
                    rel="noopener"
                  >{reference.text}</a></li>
                ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}