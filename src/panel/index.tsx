/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

const css = require<CSSModule>("./index.styl");

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
  DiffAction = "DiffAction",
  ScrubberAction = "ScrubberAction",
}

const actions: Actions = {
  [Action.TogglePanel]:
    (patch) => {
      patch((model) => ({...model, open: !model.open}));
    },
  [Action.JumpToHistoryItem]:
    (patch, index) => {
      patch((model) => {
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
      });
    },
  [Action.DiffAction]:
    (patch, action, ...args) => {
      diff.actions[action](patch.as(["diff"]), ...args);
    },
  [Action.ScrubberAction]:
    (patch, action, ...args) => {
      scrubber.actions[action](patch.as(["scrubber"]), ...args);
    },
};

// View

interface Props extends RootProps {
  model: Model;
}

const view = ({model, act}: Props) => (
  <div class={css.__DUCKWEED_DEVTOOL__}>
    <button class={css.panelButton} on-click={act([Action.TogglePanel])}>
      {model.open ? "▼" : "▲"}
    </button>
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
