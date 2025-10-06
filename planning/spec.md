# Documentation Planner Spec

## Overview

The purpose of this spec file is to define the requirements for a Documentation Planner tool. This tool helps users plan what documentation they should create and where that documentation should live.

## Context

- ./planning/**
- ./package.json
- ./src/**

## Design Style
- Use tailwind blue for primary color
- White background
- Keep design clean, minimalistic, but professional
- See ./planning-design-inspiration.png for the vibe we're going for
- Use ./src/assets/images/logo.svg as the logo

## Screens

### Home

See: ./planning/home.png

The home screen has the following elements:
1. A top banner with "Documentation Planner" in the top left
2. In the center area, there's a question: "What are you documenting?"
3. Below that, are clickable tiles for each type of thing the Documentation Planner supports documenting.
  - The tiles get populated dynamically from the subjects in src/data/index.js
    - Their icons should be set as base64 encoded images in src/data/index.js
  - This should use flex with flex wrapping because we will add more tiles in the future
  - Hovering over the tile should make it very apparent which on you're hovering over, with a colored outline
  - Use tailwind containers to restrict this content area's width
  - Should be implemented as radio buttons under the hood for a11y
4. A footer that is at the bottom of the viewport when everything can fit in a single viewport. When it can't fit in a single viewport, it just appears at the bottom of the page. Content: "Created with love by Hyaline.dev - Keep your documentation up-to-date with each PR."

When the user clicks on one of the tiles, the "Home - Options" section appears below the tiles and the page smoothly scrolls to the top of that section. The top question and tiles should still be on the screen if the user scrolls back up with the currently selected tile still outlined. Users should be able to switch to a different tile if they want

#### Home - Options

See: ./planning/home-options.png

The Home - Options section contains:
1. The sticky navbar still visible at the top
2. A header "Please answer the following questions about the `<subject>` you are documenting."
3. A series of questions with checkbox answers.
  - These questions and answers are populated dynamically from the corresponding subject's `questions` property (e.g. `./src/data/repo.js` for repo)
4. A button "Plan My Documentation" that goes to the next screen
5. The "Created with love..." footer at the bottom

### Documentation

See ./planning/documentation.png

The Documentation page contains:
1. A sticky top nav bar with the logo, "Documentation Planner", and subject (e.g. "Documentation Planner > Repo")
2. A read-only box showing the list of options they chose for each of the questions (e.g. "Visibility: Internal, External (public facing); Type: Library, Application")
  - On the right side of the box is a pencil icon button that the user can click on to edit their options (see "Documentation - Options")
3. A side-by-side layout with "Items to document" on the left and "Documents" on the right
   1. "Items to document":
      1. Automatically populated from the `items` property from the subject's file (e.g. `./src/data/repo.js`)
      2. Each top-level category of items (e.g. "Core", "Marketing") is in an expand-collapse section
      3. Within each category, items are listed for the category
      4. Items appear with checkboxes, where the checkbox for items that have children control the descendants (e.g. "checked" when all children are checked, "unchecked" when all children are unchecked, "-" when some children are checked and some are unchecked)
      5. Items are filtered to only show items that match the options the user selected (e.g. an item with attributes: "EXTERNAL" will only show up if the user selected "EXTERNAL"). If there are multiple attributes (e.g. "EXTERNAL", "API"), all attributes have to match in order for the item to show up
   2. "Documents":
      1. Each document that had at least one item selected from the left side is rendered
         1. Each document can be collapsed, similar to the categories on the left
         2. The document name is displayed on the left and a "Copy as Markdown" is displayed on the right
      2. For each of the leaf node items on the left that are checked, they should appear in a corresponding document on the right
      3. Items are rendered in the document on the right based on the following:
         1. 
         ```
         /**
          * Document rendering:
          * Each item detail contains at least a document and optionally a section.
          * The section is a "#" separated string that denotes the place in the hierarchy.
          * 
          * When rendering items into documents they are rendered in the order they appear in a depth-first search.
          * Items that only have a document are rendered at the top of the document (after any existing items).
          * Items that have a section are rendered into that section (after any prior items have been rendered into that section).
          * 
          * Template:
          * ${instructions}
          * ${usage} // if present
          * Example: ${examples} // if present, loop
          * ${references} // e.g. [1][2]
          */
          ```
         2. Each item is rendered with a faded dashed outline box around its instructions that has the source of the item rendered in the top left of the outline box, overlapping the line and shifted to the left a little bit (line should not be visible where the source overlaps it). (e.g. "Core > One Liner"). This box and source does NOT get copied when the user clicks "copy as markdown"
   3. Responsiveness:
      1. On desktop, each section displays side by side and takes up the available viewport and each section is independently scrollable
      2. On mobile, the second section wraps beneath the first section. Each section is rendered completely without a scrollbar and only the page scrolls.
4. The "Created with love..." footer

#### Documentation - Options

See: ./planning/documentation-options.png

When the user clicks on the "edit options" pencil icon button, a modal appears (using modern HTML 5 semantic modals ("dialogue") to handle things like accessibility). The modal contains:
1. The same content that was present in "Home - Options"
2. A "Cancel" and "Apply" button group in the bottom right

If items no longer match the filters, they disappear

## Additional Requirements

- All of the things the user sets (what they are documenting, options, and which items to document) should be persisted and synced between the page and URL so that someone could bookmark the page for later use or show it to someone

## Tasks

### Phase 1: Project Setup & Core Infrastructure
1. **Set up testing infrastructure**
   - Install and configure Jest and React Testing Library
   - Set up test scripts in package.json
   - Configure test environment for React 19
   - Create test utilities and helpers

2. **Set up routing and URL state management (TDD)**
   - Write tests for URL query param parsing
   - Write tests for state-to-URL serialization
   - Write tests for initial page routing logic
   - Implement URL-based state management using query parameters
   - Parse query params: `?subject=<name>&<question>=["val1","val2"]&items=["path1","path2"]`
   - Create hooks for syncing state to/from URL
   - Handle initial page load (home vs documentation based on `?subject` presence)
   - Implement browser history integration

3. **Create data utilities and filtering logic (TDD)**
   - Write tests for subject lookup utility
   - Write tests for attribute matching logic (all attributes match, no attributes = always included)
   - Write tests for depth-first search traversal
   - Write tests for filtering function with various attribute combinations
   - Write tests for checkbox state calculation (checked/unchecked/indeterminate)
   - Implement utilities to pass tests
   - Create utility to get subject by name/ID
   - Implement attribute matching logic
   - Create depth-first search traversal for items
   - Build filtering function to show/hide items based on selected attributes
   - Create checkbox state management (checked/unchecked/indeterminate for parent items)

4. **Create document rendering logic (TDD)**
   - Write tests for section hierarchy parsing
   - Write tests for document structure building
   - Write tests for item ordering logic
   - Write tests for markdown generation (all template variations)
   - Implement document rendering to pass tests
   - Parse section hierarchy from `#` separated strings
   - Build document structure with proper heading levels
   - Implement item ordering (no section → top, with section → in hierarchy, depth-first order)
   - Create markdown generation from item details (instructions, usage, examples, references)
   - Implement "Copy as Markdown" functionality (copy only visible content, exclude source labels/boxes)

### Phase 2: Home Screen Implementation
5. **Build Home page layout (TDD)**
   - Write tests for Home component rendering
   - Write tests for footer positioning logic
   - Implement Home page component
   - Create top banner with "Documentation Planner" text and logo
   - Add centered question "What are you documenting?"
   - Implement responsive container with Tailwind
   - Add footer with "Created with love by Hyaline.dev..." text
   - Position footer at bottom of viewport when content fits, otherwise at bottom of page

6. **Implement subject tiles (TDD)**
   - Write tests for tile rendering from data
   - Write tests for tile selection behavior
   - Write tests for accessibility (radio button semantics)
   - Write tests for scroll behavior on selection
   - Implement subject tiles component
   - Dynamically populate tiles from subjects in src/data/index.js
   - Render base64 encoded icons
   - Use flexbox with flex-wrap for tile layout
   - Implement radio button semantics for accessibility
   - Add hover state with colored outline (tailwind blue)
   - Handle tile selection and smooth scroll to Home - Options section

7. **Build Home - Options section (TDD)**
   - Write tests for show/hide behavior
   - Write tests for dynamic question rendering
   - Write tests for checkbox selection and URL updates
   - Write tests for navigation to Documentation page
   - Implement Home - Options component
   - Show/hide based on tile selection
   - Display header with selected subject name
   - Dynamically render questions from subject's `questions` property
   - Render checkbox answers for each question
   - Add "Plan My Documentation" button
   - Update URL params when options are selected
   - Navigate to Documentation page on button click

### Phase 3: Documentation Page Implementation
8. **Build Documentation page layout (TDD)**
   - Write tests for Documentation component rendering
   - Write tests for navbar breadcrumb display
   - Write tests for options summary display
   - Write tests for page title updates
   - Implement Documentation page component
   - Create sticky top navbar with logo, "Documentation Planner > [Subject]" breadcrumb
   - Implement read-only selected options summary box
   - Add pencil icon "edit options" button
   - Create side-by-side layout (desktop) / stacked layout (mobile)
   - Add footer
   - Update page title dynamically

9. **Implement "Items to document" section (TDD)**
   - Write tests for category rendering and expand/collapse
   - Write tests for item filtering based on attributes
   - Write tests for tri-state checkbox logic
   - Write tests for parent-child checkbox relationships
   - Write tests for URL param syncing
   - Implement Items section component
   - Render expand/collapse categories from items
   - Show filtered items based on selected attributes
   - Implement tri-state checkboxes (checked/unchecked/indeterminate)
   - Handle parent-child checkbox relationships
   - Sync checkbox states with URL params
   - Make section independently scrollable on desktop

10. **Implement "Documents" section (TDD)**
    - Write tests for document grouping logic
    - Write tests for expand/collapse functionality
    - Write tests for section hierarchy rendering
    - Write tests for item rendering with source labels
    - Write tests for "Copy as Markdown" functionality
    - Implement Documents section component
    - Render documents that have at least one selected item
    - Group items by document name
    - Implement expand/collapse for each document
    - Render items with proper section hierarchy (headers based on `#` separator)
    - Display items in depth-first order
    - Show source label in faded dashed outline box (e.g., "Core > One Liner")
    - Position source label overlapping top-left of outline (hide line behind text)
    - Add "Copy as Markdown" button for each document
    - Make section independently scrollable on desktop
    - Render template: instructions, usage (if present), examples (if present), references

11. **Implement Documentation - Options modal (TDD)**
    - Write tests for modal open/close behavior
    - Write tests for options reselection
    - Write tests for Apply/Cancel actions
    - Write tests for accessibility features
    - Write tests for item filtering on Apply
    - Implement modal component
    - Create semantic HTML5 `<dialog>` element
    - Show same questions/checkboxes as Home - Options
    - Add "Cancel" and "Apply" button group (bottom right)
    - Handle accessibility (focus trap, ESC to close, etc.)
    - On Apply: update URL params, re-filter items, remove non-matching items from selection
    - On Cancel: close without changes

### Phase 4: Responsive Design & Polish
12. **Implement responsive behavior (with tests)**
    - Write tests for responsive layout changes
    - Write tests for scroll behavior on different viewports
    - Implement responsive CSS
    - Desktop: side-by-side sections, independent scrolling
    - Mobile (< Tailwind lg breakpoint): stacked sections, page-level scrolling only
    - Test tile wrapping on different screen sizes
    - Ensure modal works on mobile

13. **Implement smooth scrolling and transitions (with tests)**
    - Write tests for scroll behavior
    - Implement smooth scrolling and animations
    - Smooth scroll when Home - Options appears
    - Quick and steady animations for expand/collapse
    - Smooth transitions for hover states

14. **Accessibility implementation (with tests)**
    - Write tests for accessibility requirements
    - Implement WCAG 2.2 AA compliance
    - Ensure WCAG 2.2 AA compliance
    - Proper ARIA labels for tiles (radio buttons)
    - Tri-state checkbox ARIA attributes
    - Modal focus management
    - Keyboard navigation support
    - Semantic HTML throughout
    - Proper heading hierarchy

### Phase 5: E2E Testing & Validation
15. **E2E test with Playwright MCP**
    - Test Home page tile selection
    - Test option selection and URL sync
    - Test navigation to Documentation page
    - Test item filtering based on attributes
    - Test checkbox selection (individual, parent-child)
    - Test document rendering and markdown copy
    - Test modal open/close/apply/cancel
    - Test responsive layouts (desktop & mobile)
    - Test URL persistence (bookmark/refresh/share scenarios)
    - Test accessibility features

16. **Cross-browser and edge case testing**
    - Test with no URL params (should show Home)
    - Test with partial/invalid URL params
    - Test with all items selected/deselected
    - Test expand/collapse all categories
    - Test copy markdown with various item configurations
    - Verify page title updates correctly
    - Test footer positioning in various content height scenarios

## Technical Details

- Always use inline Tailwind classes
- Keep the implementation and dependencies simple. Ask me before adding anything else
- Use React 19
- Use Tailwind 4 (make sure to look up usage patterns since they are very different from 3)
- Use the playwright MCP server to validate changes along the way
- Follow accessibility practices to be WCAG 2.2AA compliant
- The page title should update as the user changes screens
  
## Finishing
- Use the playwright MCP server to validate all changes