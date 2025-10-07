// @ts-nocheck
import '@testing-library/jest-dom';

// Polyfill for HTMLDialogElement methods (not supported in jsdom yet)
if (typeof HTMLDialogElement === 'undefined') {
  global.HTMLDialogElement = class HTMLDialogElement extends HTMLElement {};
}

HTMLDialogElement.prototype.showModal = HTMLDialogElement.prototype.showModal || function() {
  this.setAttribute('open', '');

  // Add ESC key listener to dispatch 'cancel' event
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      const cancelEvent = new Event('cancel', { bubbles: false, cancelable: true });
      const shouldClose = this.dispatchEvent(cancelEvent);
      if (shouldClose) {
        this.close();
      }
    }
  };

  this._escHandler = handleKeyDown;
  document.addEventListener('keydown', this._escHandler);
};

HTMLDialogElement.prototype.close = HTMLDialogElement.prototype.close || function() {
  this.removeAttribute('open');

  // Clean up ESC key listener
  if (this._escHandler) {
    document.removeEventListener('keydown', this._escHandler);
    this._escHandler = null;
  }

  // Dispatch close event
  const closeEvent = new Event('close', { bubbles: false, cancelable: false });
  this.dispatchEvent(closeEvent);
};
