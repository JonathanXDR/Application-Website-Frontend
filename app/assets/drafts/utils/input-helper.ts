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
 * A window.getSelection utility that works with all browsers.
 * Firefox does not work with window.getSelection on `input` elements,
 * IE does not support it at all.
 */
export function getSelectionText(): string {
  if (window.getSelection) {
    try {
      const { activeElement } = document
      if (activeElement instanceof HTMLInputElement) {
        // firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=85686
        return activeElement.value.substring(
          activeElement.selectionStart ?? 0,
          activeElement.selectionEnd ?? 0,
        )
      }
      return window.getSelection?.toString()
    }
    catch (e) {
      return ''
    }
  }
  else if (
    document.getSelection
    && document.getSelection()?.type !== 'Control'
  ) {
    // For IE
    const selection = document.getSelection()
    return selection ? selection.toString() : ''
  }
  return ''
}

/**
/**
 * Moves a cursor to the end of an input
 */
export function moveCursorToEnd(el: HTMLInputElement): void {
  if (typeof el.selectionStart === 'number') {
    el.selectionStart = el.selectionEnd = el.value.length
  }
  else if (typeof el.setRangeText !== 'undefined') {
    el.focus()
    // const range = el.setRangeText
    // range.collapse(false)
    // range.select()
  }
}
/**
 * Moves a cursor to the start of an input
 */
export function moveCursorToStart(el: HTMLInputElement): void {
  el.selectionStart = el.selectionEnd = 0
}

export function isSingleCharacter(key: string): boolean {
  return /^[\s\S]$/.test(key)
}
