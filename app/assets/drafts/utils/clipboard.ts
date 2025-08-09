/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2022 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
 */

/**
 * Parses HTML data coming from clipboard
 * @param {string} payload
 * @return {object | null}
 */
export function parseDataFromClipboard(payload: string): object | null {
  const match = payload.match(/<data [^>]*id="copy-data"[^>]*>(.*?)<\/data>/);
  try {
    return match && match[1] ? JSON.parse(match[1]) : null;
  } catch {
    return null;
  }
}

/**
 * Prepared data to be sent to the clipboard as `text/html` payload
 * @param {*} payload
 * @return {string}
 */
export function prepareDataForHTMLClipboard(payload: string | object): string {
  if (typeof payload !== "string") {
    payload = JSON.stringify(payload);
  }
  return `<data id="copy-data">${payload}</data>`;
}
