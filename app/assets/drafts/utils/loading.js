/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
 */

/**
 * Returns a promise which is invoked in `numFrames`
 * @param numFrames
 * @returns {Promise<any>}
 */

export function waitFrames(numFrames) {
  let resolve = null;
  let framesLeft = numFrames - 1;
  // eslint-disable-next-line promise/param-names
  const promise = new Promise((res) => {
    resolve = res;
  });
  requestAnimationFrame(function loop() {
    framesLeft -= 1;
    if (framesLeft <= 0) {
      resolve();
    } else {
      requestAnimationFrame(loop);
    }
  });
  return promise;
}

export function waitFor(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
