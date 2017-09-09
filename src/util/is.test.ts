/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

import * as is from "./is";

describe("is.primitive()", () => {
  [1, "str", false, null, undefined].forEach((x) => {
    it(`Should tell us that a value like ${x} is a primitive`, () => {
      expect(is.primitive(x)).toBe(true);
    });
  });

  [{}, [1, 2], new Date(), () => "func", /123/].forEach((x) => {
    it(`Should tell us that a value like ${x} is not primitive`, () => {
      expect(is.primitive(x)).toBe(false);
    });
  });
});

describe("is.container()", () => {
  [{}, [1, 2, 3]].forEach((x) => {
    it(`Should tell us that a value like ${x} is a container`, () => {
      expect(is.container(x)).toBe(true);
    });
  });

  [new Date(), /123/].forEach((x) => {
    it(`Should tell us that a value like ${x} is not a container`, () => {
      expect(is.container(x)).toBe(true);
    });
  });
});

describe("is.pojo()", () => {
  it("Should tell us that a plain JS object is a pojo", () => {
    expect(is.pojo({foo: 12})).toBe(true);
  });

  [[1, 2, 3], /123/, new Date(), new Event("click"), new Promise(() => false)].forEach((x) => {
    it(`Should tell us that non-plain non-primitive objects like ${x} is not pojo`, () => {
      expect(is.pojo(x)).toBe(false);
    });
  });
});

describe("is.array()", () => {
  it("Should tell us that an array is an array", () => {
    expect(is.array([1, 2, 3])).toBe(true);
  });

  it("Cannot be fooled by an object with numeric keys", () => {
    expect(is.array({[1]: 1, [2]: 2, length: 2})).toBe(false);
  });
});

describe("is.undef()", () => {
  it("Should tell us that undefined is undefined", () => {
    expect(is.undef(undefined)).toBe(true);
  });
});

describe("is.NULL()", () => {
  it("Should tell us that null is null", () => {
    expect(is.NULL(null)).toBe(true);
  });
});

describe("is.nil()", () => {
  it("Should tell us that a value is undefined or null", () => {
    expect(is.nil(undefined)).toBe(true);
    expect(is.nil(null)).toBe(true);
  });
});
