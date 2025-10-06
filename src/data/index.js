import repository from './repository.js';
import system from './system.js';

/**
 * @typedef {object} Subject
 * @property {string} name - The name of the subject.
 * @property {string} icon - A base64 encoded SVG icon representing the subject.
 * @property {Array<Question>} questions - Questions to help select the applicable attributes.
 * @property {Array<Item>} items - A list of items.
 */

/**
 * @typedef {object} Question
 * @property {string} question - The question.
 * @property {Array<Attribute>} attributes - The available attributes.
 */

/**
 * @typedef {object} Attribute
 * @property {string} name - The attribute's name.
 * @property {string} value - The attribute's value.
 */

/**
 * @typedef {object} Item
 * @property {string} name
 * @property {Detail} [detail] - Detail about the item (only set on leaf nodes).
 * @property {Array<Item>} [items] - A list of items.
 */

/**
 * @typedef {object} Detail
 * @property {string} purpose - The purpose of this item
 * @property {string} instructions - Instructions on how to complete this item
 * @property {string} [usage] - Notes about the usage
 * @property {Array<string>} [attributes] - Attributes this item is applicable to (must match all)
 * @property {Array<Example>} [examples] - Examples
 * @property {Array<string>} [references] - References (urls)
 * @property {string} document - The document this item should belong to
 * @property {string} [section] - The section this item should belong to
 */

/**
 * @typedef {object} Example
 * @property {string} example - The example
 * @property {string} [reference] - The reference (url)
 * @property {string} [retrieved] - The date retrieved
 */

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

/**
 * @type Array<Subject>
 */
const subjects = [
  repository,
  system,
];

export default subjects;