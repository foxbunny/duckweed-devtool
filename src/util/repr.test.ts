/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

import repr from "./repr";

describe("repr", () => {
  [
    [new Date(1489205167008), "[Date 1489205167008]"],
    [/123/, "[RegExp /123/]"],
    [new Set([1, 2, 3]), "[Set (1, 2, 3)]"],
    [new Promise(() => false), "[Promise]"],
    [Error("123"), "[Error 123]"],
    [TypeError("123"), "[TypeError 123]"],
  ].forEach(([x, res]) => {
    it(`Should return a useful string represenation of a value like ${x}`, () => {
      expect(repr(x)).toBe(res);
    });
  });
});
