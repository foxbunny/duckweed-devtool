/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

import diff from "./diff";

describe("diff", () => {
  ["foo", 1, undefined, null, {}, [], true].forEach((o: any) => {
    it(`Should return an ident for identical objects, like ${o}`, () => {
      expect(diff(o, o).type).toBe("ident");
    });
  });

  [
    ["foo", 1],
    ["bar", true],
    [0, null],
    [[], "foo"],
    [true, {}],
  ].forEach(([x, y]: [any, any]) => {
    it("Should return an update for non-identical objects", () => {
      expect(diff(x, y).type).toBe("update");
    });
  });

  it("Should return a diff for each key in an object when dealing with objects", () => {
    const x = {foo: "1"};
    const y = {foo: "1"};
    const z = {foo: 1};
    const w = {bar: "test", baz: 12};
    expect(diff(x, y).foo.type).toBe("ident");
    expect(diff(x, z).foo.type).toBe("update");
    expect(diff(x, w).foo.type).toBe("del");
    expect(diff(x, w).bar.type).toBe("add");
    expect(diff(x, w).baz.type).toBe("add");
  });

  it("Should return a diff for each array item when dealing with arrays", () => {
    const x = [1, 2, 3];
    const y = [1, 2, 3];
    const z = [1, 3, 4, 5];
    expect(Array.isArray(diff(x, y))).toBe(true);
    expect(diff(x, y).map((d: any) => d.type).every((t: boolean) => t));
    expect(diff(x, z)[1].type).toBe("update");
    expect(diff(x, z)[2].type).toBe("update");
    expect(diff(x, z)[3].type).toBe("add");
  });
});
