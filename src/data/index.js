import repository from './repository.js';
import system from './system.js';
import team from './team.js';

/**
 * @typedef {object} Subject
 * @property {string} name - The name of the subject.
 * @property {string} icon - A base64 encoded SVG icon representing the subject.
 * @property {Array<Question>} questions - Questions to help select the applicable attributes.
 * @property {Array<Document>} documents - A list of documents.
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
 * @typedef {object} Document
 * @property {string} name - The name of the document.
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
 * @property {string} [guidance] - Guidance about this item
 * @property {Array<Example>} [examples] - Examples
 * @property {Array<string>} [references] - References (urls)
 * @property {Array<string>} [attributes] - Attributes this item is applicable to (must match all)
 * @property {string} document - The document this item should belong to
 * @property {string} [section] - The section this item should belong to. Sections are "#" separated for hierarchy (e.g. "Architecture#Overview")
 */

/**
 * @typedef {object} Example
 * @property {string} example - The example
 * @property {Reference} [reference] - The reference
 */

/**
 * @typedef {object} Reference
 * @property {string} text - The reference
 * @property {string} [link] - A link to the reference
 * @property {string} [retrieved] - The date retrieved
 */

/**
 * @type Array<Subject>
 */
const subjects = [
  repository,
  system,
  team
];

export default subjects;