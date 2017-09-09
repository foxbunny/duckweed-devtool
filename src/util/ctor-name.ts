/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

const ctorName = (obj: any) =>
  obj.constructor.name || obj.constructor
    .toString()
    .split("(")[0]
    .replace("function", "")
    .trim();

export default ctorName;
