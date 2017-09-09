/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

import ctorName from "./ctor-name";

/**
 * Make some of the object look a bit better when converted to string.
 */
const repr = (obj: any) => {
  const ctor = obj.constructor;
  if (obj instanceof Error) {
    return `[${ctorName(obj)} ${obj.message}]`;
  } else if (ctor === Promise) {
    return "[Promise]";
  } else if (ctor === Set) {
    return `[Set (${Array.from(obj).join(", ")})]`;
  } else {
    return `[${ctorName(obj)} ${obj.valueOf()}]`;
  }
};

export default repr;
