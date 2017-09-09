/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

type Listener = (...args: any[]) => any;

const createChannel = () => {
  return (() => {
    let listeners: Listener[] = [];

    return {
      addListener(fn: Listener) {
        listeners.push(fn);
      },
      removeListener(fn: Listener) {
        listeners = listeners.filter((f) => f !== fn);
      },
      send(...args: any[]) {
        listeners.forEach((fn) => fn(...args));
      },
    };
  })();
};

export {createChannel};
