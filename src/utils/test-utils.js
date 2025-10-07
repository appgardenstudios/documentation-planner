import { render } from '@testing-library/react';

/**
 * Custom render function that wraps components with common providers
 */
export function renderWithProviders(ui, options = {}) {
  return render(ui, { ...options });
}

export * from '@testing-library/react';
export { renderWithProviders as render };
