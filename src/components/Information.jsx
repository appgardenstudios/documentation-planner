import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import ExternalLinkIcon from '../assets/images/icons/external-link.svg?react';
import CloseIcon from '../assets/images/icons/close.svg?react';

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
    <dialog ref={dialogRef} onClose={onClose} className="m-auto max-w-prose h-full max-h-[calc(100dvh-64px)] rounded-lg shadow-xl">
      <div className="flex flex-col h-full border border-gray-200 rounded-lg bg-white">
        <div className="flex justify-between items-center pl-6 pr-3 py-3 bg-gray-50 border-b border-gray-200">
          <h2>{item.path}</h2>
          <button autoFocus type="button" onClick={onClose} className="cursor-pointer" aria-label="Close information dialog">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="pt-4 pb-6 px-6 h-full overflow-y-auto">
          <h3 className="text-lg font-bold mb-1">Purpose</h3>
          <div>{item.detail.purpose}</div>
          <h3 className="text-lg font-bold mt-4 mb-1">Instructions</h3>
          <div>{item.detail.instructions}</div>
          <h3 className="text-lg font-bold mt-4 mb-1">Guidance</h3>
          <div>
            <Markdown
              components={{
                strong(props) {
                  const {node, ...rest} = props
                  return <span className="font-semibold" {...rest} />
                },
                p(props) {
                  const {node, ...rest} = props
                  return <p className="mb-4" {...rest} />
                },
                ul(props) {
                  const {node, ...rest} = props
                  return <ul className="list-disc list-outside pl-8 mb-4" {...rest} />
                },
                li(props) {
                  const {node, ...rest} = props
                  return <li className="mb-1" {...rest} />
                }
              }}
            >{item.detail.guidance}</Markdown>
          </div>
          {item.detail.examples && (
            <>
              <h3 className="text-lg font-bold mt-4 mb-1">Examples</h3>
              <div>
                <ul className="list-disc list-outside pl-8">
                  {item.detail.examples.map((example, idx) => (
                    <li key={idx} className="mb-1">
                      "{example.example}"
                      {example.reference && (
                        <a
                          href={example.reference.link}
                          className="text-blue-600 hover:text-blue-700 ml-1"
                          target="_blank"
                          rel="noopener"
                          aria-label={`See the example for ${example.reference.text}`}
                        >
                          <ExternalLinkIcon className="inline h-4 w-4 ml-1 -translate-y-0.5" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {item.detail.references && (
            <>
              <h3 className="text-lg font-bold mt-4 mb-1">References</h3>
              <div>
                <ul className="list-disc list-outside pl-8">
                {item.detail.references.map((reference, idx) => (
                  <li key={idx} className="mb-1">
                    <a
                      className="text-blue-600 hover:text-blue-700"
                      href={reference.link}
                      target="_blank"
                      rel="noopener"
                    >
                      {reference.text}
                      <ExternalLinkIcon className="inline h-4 w-4 ml-1 -translate-y-0.5" />
                    </a>
                  </li>
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