/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

declare type Primitive = string | number | boolean | null | void;

interface Pojo {
  [key: string]: any;
}

declare type Container = {[key: string]: any} | any[];

declare type Func = (...args: any[]) => any;

declare type Nil = void | null;

const primitive = (val: any): val is Primitive =>
  val === null || typeof val !== "object" && typeof val !== "function";

const container = (val: any): val is Container =>
  typeof val === "object" && val !== null;

const pojo = (val: any): val is Pojo =>
  container(val) && val.constructor === Object;

const array = (val: any): val is any[] =>
  Array.isArray(val);

const func = (val: any): val is Func =>
  typeof val === "function";

const undef = (val: any): val is void =>
  typeof val === "undefined";

const NULL = (val: any): val is null =>
  val === null;

const nil = (val: any): val is Nil =>
  val == null;

export {
  Primitive,
  Pojo,
  Container,
  primitive,
  container,
  pojo,
  array,
  func,
  undef,
  NULL,
  nil,
};
