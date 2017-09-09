/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

import * as is from "util/is";

type DiffType = "ident" | "update" | "add" | "del";

class Diff {
  public static ident(val: any) {
    return new Diff("ident", val, val);
  }
  public static update(prev: any, next: any) {
    return new Diff("update", prev, next);
  }
  public static add(val: any) {
    return new Diff("add", undefined, val);
  }
  public static del(val: any) {
    return new Diff("del", val, undefined);
  }

  constructor(public type: DiffType, public prev: any, public next: any) {}
}

/**
 * Generate a diff between two objects
 */
function diff(x: is.Primitive, y: is.Primitive | is.Container): Diff;
function diff(x: is.Primitive | is.Container, y: is.Primitive): Diff;
function diff(x: is.Pojo, y: is.Pojo): is.Pojo;
function diff(x: any[], y: any[]): any[];
function diff(x: any, y: any): any[] | is.Pojo | Diff {
  if (x === y) {
    return Diff.ident(x);
  }
  if (is.undef(x)) {
    return Diff.add(y);
  }
  if (is.undef(y)) {
    return Diff.del(x);
  }
  if (is.primitive(x) && is.primitive(y)) {
    // Both primitive, so there's nothing deeper to consider
    return Diff.update(x, y);
  }
  if (is.primitive(x) || is.primitive(y)) {
    // One of them is a primitive, so we won't go deeper
    return Diff.update(x, y);
  }
  // At this point, we've exhausted the possibility of having primitives on
  // either side. They should all be either objects or arrays.
  if (is.pojo(x) && is.array(y) || is.array(x) && is.pojo(y)) {
    return Diff.update(x, y);
  }
  if (is.pojo(x)) {
    const uniqKyes = Array.from(new Set(Object.keys(x).concat(Object.keys(y))));
    return uniqKyes.reduce((out, k) => {
      out[k] = diff(x[k], y[k]);
      return out;
    }, {} as is.Pojo);
  }
  return (() => {
    const l = Math.max(x.length, y.length);
    const out = [];
    for (let i = 0; i < l; i ++) {
      out.push(diff(x[i], y[i]));
    }
    return out;
  })();
}

export {
  DiffType,
  Diff,
};
export default diff;
