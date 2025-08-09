/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
 */

import "css.escape";

// characters that we want to replace by a dash to make them valid in the hash section
// https://url.spec.whatwg.org/#fragment-percent-encode-set
const NON_URL_CHARS_RE = /\s+|[`"<>]/g;
const INITIAL_DASH_RE = /^-+/;

// characters to escape for safe usage in HTML
const HTML_UNSAFE_RE = /["'&<>]/g;

/**
 * Transforms a string into a valid anchor by removing all uppercase letters
 * @param {string} str string to transform to kebab case
 */

export function anchorize(str: string): string {
  return str
    .trim()
    .replace(NON_URL_CHARS_RE, "-")
    .replace(INITIAL_DASH_RE, "")
    .toLowerCase();
}

export function escapeHtml(str: string): string {
  interface CharacterMap {
    [character: string]: string;
  }

  const sanitize = (character: string): string =>
    (
      ({
        '"': "&quot;",
        "'": "&apos;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
      }) as CharacterMap
    )[character] || character;
  return str.replace(HTML_UNSAFE_RE, sanitize);
}

export const PluralCategory = {
  zero: "zero",
  one: "one",
  two: "two",
  few: "few",
  many: "many",
  other: "other",
};

export const PluralRuleType = {
  cardinal: "cardinal",
  ordinal: "ordinal",
};

// Escape URL hash fragments for use in CSS selectors, which is needed to
// utilize vue-router support for linking to on-page elements when the ID value
// is a number (or any string with a leading digit).
//
// This is needed because vue-router handles navigating to hash fragments by
// using CSS selectors and querySelector API from the DOM, which do not support
// selectors starting with numeric digits, even though HTML ID attributes can
// start with numeric digits and be valid.
//
// Source: https://www.w3.org/International/questions/qa-escapes#css_identifiers
//
// Example: cssEscapeTopicIdHash('#42') => '#\34 2'
export function cssEscapeTopicIdHash(hash: string): string {
  return hash.replace(
    /#(.*)/,
    (str: string, match: string): string => `#${CSS.escape(match)}`,
  );
}

// Escape a string for use in a `RegExp`, which will escape any special regular
// expression characters using a backslash character. This is needed to create
// a regular expression that wants to treat these special characters as normal
// characters in a pattern string.
//
// For more information, see:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
export function escapeRegExp(str: string) {
  return str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}

// Deletes spaces on any string
export function deleteSpaces(str: string) {
  return str.replace(/\s/g, "");
}

/**
 * Loops over each character in a text query, adding white space matches before each character.
 * Can be used with text returned from {@see escapeRegExp}.
 * @param {string} stringToSanitize - the string to sanitize and add matches to
 * @return {string}
 */
export function whiteSpaceIgnorantRegex(stringToSanitize: string): string {
  let i;
  let char;
  const spaceMatch = "\\s*";
  const singleSpace = " ";

  // If string is only spaces, return a single space.
  // Otherwise the resulting regex may have infinite matches.
  const trimmedString = stringToSanitize.trim();
  const len = trimmedString.length;
  if (!len) return singleSpace;

  const collector = [];
  // loop over each character
  for (i = 0; i < len; i += 1) {
    char = trimmedString[i];
    // if the character is an escape char, pass it and the next character
    if (char === "\\") {
      // pass both escape char and char, with an empty space match before, only if not first char
      collector.push(`${i === 0 ? "" : spaceMatch}${char}`);
      collector.push(trimmedString[i + 1]);
      // skip one character in next iteration
      i += 1;
    } else if (i === 0) {
      // skip the first character, if its not a `\`
      collector.push(char);
      // add anything else, but empty spaces
    } else if (char !== singleSpace) {
      collector.push(`${spaceMatch}${char}`);
    }
  }
  return collector.join("");
}

/**
 * Inserts a string into another string
 * at a provided index.
 * @param {string} str - string to insert into
 * @param {string} sub - string to insert
 * @param {number} pos - position index to insert at
 * @returns {string} The resulting string after insertion
 */
export function insertAt(str: string, sub: string, pos: number = 0) {
  return `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
}

// Returns the first paragraph of the given text.
//
// @param {string} text - The full text.
// @return {string} The first paragraph.
//
// Examples:
//
// firstParagraph("abcdefghi") // "abcdefghi"
// firstParagraph("abc\ndef\nghi") // "abc"
export function firstParagraph(text: string): string | undefined {
  const paragraphs = text.split(/(?:\r?\n)+/);
  return paragraphs[0];
}
