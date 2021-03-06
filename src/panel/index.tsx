/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

const css = require<CSSModule>("./index.styl");
const icon = require<string>("icons/duckweed.svg");

import * as duckweed from "duckweed";
import {ActionHandler, Actions, Props as RootProps} from "duckweed/runner";

import {host2client} from "devtool";

import * as diff from "./diff";
import * as graph from "./graph";
import * as scrubber from "./scrubber";

interface HistoryItem {
  start: number;
  duration: number;
  before: any;
  after: any;
  diff: any;
}

type DisplayMode = "diff" | "graph";

// Model

interface Model {
  currentIndex: number;
  history: HistoryItem[];
  open: boolean;
  panel: DisplayMode;
  diff: diff.Model;
  scrubber: scrubber.Model;
}

const init = (): Model => ({
  currentIndex: 0,
  diff: diff.init(),
  history: [],
  open: false,
  panel: "diff",
  scrubber: scrubber.init(),
});

// Actions

enum Action {
  TogglePanel = "TogglePanel",
  JumpToHistoryItem = "JumpToHistoryItem",
  ClearHistory = "ClearHistory",
  SwitchDisplay = "SwitchDisplay",
  DiffAction = "DiffAction",
  ScrubberAction = "ScrubberAction",
}

const jumpTo = (model: Model, index: number, setPos: boolean = false) => {
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
    scrubber: setPos
      ? {
        ...model.scrubber,
        pos: index / (model.history.length - 1),
      }
      : model.scrubber,
  };
};

const actions: Actions = {
  [Action.TogglePanel]:
    (patch) => {
      patch((model) => ({...model, open: !model.open}));
    },
  [Action.JumpToHistoryItem]:
    (patch, index) => {
      patch((model) => jumpTo(model, index, true));
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
  [Action.SwitchDisplay]:
    (patch, mode: DisplayMode) => {
      patch((model) => ({
        ...model,
        panel: mode,
      }));
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

const tab = (act: ActionHandler, currentPanel: string, targetPanel: string, label: string) => (
  <a
    class={{
      [css.tabButton]: true,
      [css[targetPanel]]: true,
      [css.currentTab]: currentPanel === targetPanel,
    }}
    on-click={currentPanel !== targetPanel ? act(Action.SwitchDisplay, targetPanel) : undefined}
  >
    <span class={[css.tabIcon, css[targetPanel + "Icon"]]} />
    <span class={css.tabLabel}>{label}</span>
  </a>
);

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
          <div class={css.tabs}>
            {tab(act, model.panel, "diff", "Model inspector")}
            {tab(act, model.panel, "graph", "Performance chart")}
          </div>
          <div class={css.infoPanel}>
            {model.panel === "diff"
              ? <diff.view
                  model={model.diff}
                  act={act.as(Action.DiffAction)} />
              : <graph.view
                  history={model.history}
                  jumpTo={act.as(Action.JumpToHistoryItem)} />
            }
          </div>
        </div>
      )
      : null}
  </div>
);

export {
  HistoryItem,
  Model,
  init,
  Action,
  actions,
  Props,
  view,
};
