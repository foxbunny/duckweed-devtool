/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

import {ActionHandler, Plugin, RunnerState} from "duckweed/runner";

import diff from "util/diff";
import {createChannel} from "util/messaging";

// NOTE: In this module 'client' is the devtool, and 'host' is the application
// being tested

const client2host = createChannel();
const host2client = createChannel();

const clientMiddleware = (fn: (model: any) => any) => (model: any) => {
  const before = model;
  const start = (new Date()).getTime();
  const after = fn(model);
  const duration = (new Date()).getTime() - start;
  client2host.send("modelUpdate", {start, duration, before, after});
  return after;
};

const clientPlugin: Plugin = {
  actions: {
    injectState: (patch, state) => {
      patch(() => state);
    },
  },
  init(act: ActionHandler, state: RunnerState) {
    host2client.addListener(act);
    client2host.send("initHistory", state.model);
  },
};

const hostPlugin: Plugin = {
  actions: {
    initHistory: (patch, initialModel) => {
      patch((model) => ({
        ...model,
        diff: {
          diff: initialModel,
          scope: [],
        },
        history: model.history.concat({
          after: initialModel,
          before: undefined,
          diff: initialModel,
          duration: 0,
          start: (new Date()).getTime(),
        }),
        scrubber: {
          ...model.scrubber,
          pos: 1,
        },
      }));
    },
    modelUpdate(patch, {start, duration, before, after}) {
      patch((model) => {
        if (after === model.history[model.currentIndex].after) {
          // This is the injected state, so we're ignoring it
          return;
        }
        const isRewound = model.currentIndex < model.history.length - 1;
        const historyBase = isRewound
          ? model.history.slice(0, model.currentIndex + 1)
          : model.history;
        const diffObj = diff(before, after);
        const newIndex = model.currentIndex + 1;
        return {
          ...model,
          currentIndex: newIndex,
          diff: {
            diff: diffObj,
            scope: model.diff.scope,
          },
          history: historyBase.concat({
            after,
            before,
            diff: diffObj,
            duration,
            start,
          }),
          scrubber: {
            ...model.scrubber,
            pos: 1,
          },
        };
      });
    },
  },
  init(act: ActionHandler, state: RunnerState) {
    client2host.addListener(act);
  },
};

export {
  client2host,
  host2client,
  clientMiddleware,
  clientPlugin,
  hostPlugin,
};
