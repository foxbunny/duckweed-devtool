/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

const css = require<CSSModule>("./index.styl");
const icon = require<string>("icons/duckweed.svg");

import * as duckweed from "duckweed";
import {Actions, Props as RootProps} from "duckweed/runner";

import {host2client} from "devtool";

import * as diff from "./diff";
import * as scrubber from "./scrubber";

interface HistoryItem {
  start: number;
  duration: number;
  before: any;
  after: any;
  diff: any;
}

// Model

interface Model {
  currentIndex: number;
  history: HistoryItem[];
  open: boolean;
  diff: diff.Model;
  scrubber: scrubber.Model;
}

const init = (): Model => ({
  currentIndex: 0,
  diff: diff.init(),
  history: [],
  open: false,
  scrubber: scrubber.init(),
});

// Actions

enum Action {
  TogglePanel = "TogglePanel",
  JumpToHistoryItem = "JumpToHistoryItem",
  ClearHistory = "ClearHistory",
  DiffAction = "DiffAction",
  ScrubberAction = "ScrubberAction",
}

const jumpTo = (model: Model, index: number) => {
  if (index === model.currentIndex) {
    return model;
  }
  host2client.send("injectState", model.history[index].after);
  return {
    ...model,
    currentIndex: index,
    diff: {
      diff: model.history[index].diff,
      scope: model.diff.scope,
    },
    scrubber: {
      ...model.scrubber,
      pos: index / (model.history.length - 1),
    },
  };
};

const actions: Actions = {
  [Action.TogglePanel]:
    (patch) => {
      patch((model) => ({...model, open: !model.open}));
    },
  [Action.JumpToHistoryItem]:
    (patch, index) => {
      patch((model) => jumpTo(model, index));
    },
  [Action.ClearHistory]:
    (patch) => {
      patch((model) => {
        const currentState = model.history[model.currentIndex];
        return {
          ...model,
          currentIndex: 0,
          diff: {
            diff: currentState.after,
            scope: [],
          },
          history: [currentState],
          scrubber: {
            ...model.scrubber,
            pos: 1,
          },
        };
      });
    },
  [Action.DiffAction]:
    (patch, action, ...args) => {
      diff.actions[action](patch.as(["diff"]), ...args);
    },
  [Action.ScrubberAction]:
    (patch, action, ...args) => {
      const scoped = patch.as(["scrubber"], (model) => {
        if (action !== scrubber.Action.Move) {
          return model;
        }
        const pos = model.scrubber.pos;
        const length = model.history.length;
        const index = Math.round(pos * (length - 1));
        return jumpTo(model, index);
      });
      scrubber.actions[action](scoped, ...args);
    },
};

// View

interface Props extends RootProps {
  model: Model;
}

const view = ({model, act}: Props) => (
  <div class={css.__DUCKWEED_DEVTOOL__}>
    <div class={css.toolbar}>
      <button class={css.panelButton} on-click={act([Action.TogglePanel])}>
        <img src={icon} alt={model.open ? "close" : "open"} />
      </button>
    </div>
    {model.open
      ? (
        <div class={css.panelContents} style={{
          delayed: {
            transform: "translateY(0)",
          },
          remove: {
            transform: "translateY(30vh)",
          },
          transform: "translateY(30vh)",
          transition: "transform 0.2s",
        }}>
          <scrubber.view
            model={model.scrubber}
            act={act.as(Action.ScrubberAction)}
            jumpTo={act.as(Action.JumpToHistoryItem)}
            clear={act.as(Action.ClearHistory)}
            current={model.currentIndex}
            length={model.history.length}
            />
          <diff.view
            model={model.diff}
            act={act.as(Action.DiffAction)} />
        </div>
      )
      : null}
  </div>
);

export {
  Model,
  init,
  Action,
  actions,
  Props,
  view,
};
