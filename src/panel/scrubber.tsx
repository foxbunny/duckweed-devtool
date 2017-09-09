/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

const css = require<CSSModule>("./scrubber.styl");

import * as duckweed from "duckweed";
import {ActionHandler, Actions} from "duckweed/runner";

const {from} = duckweed.events;

// Model

interface Model {
  dragging: boolean;
  pos: number;
  initialMouse: number;
  initialPos: number;
  barWidth: number;
}

const init = (): Model => ({
  barWidth: 0,      // in px
  dragging: false,
  initialMouse: 0,  // initial mouse position in px
  initialPos: 0,    // in fraction of the width (e.g., 0.4 == "40% width")
  pos: 1,           // in fraction of the width (e.g., 0.4 == "40% width")
});

// Actions

enum Action {
  Start = "Start",
  End = "End",
  Move = "Move",
}

const restrict = (min: number, max: number, val: number) =>
  Math.max(min, Math.min(max, val));

const actions: Actions = {
  [Action.Start]:
    (patch, x, w) => {
      patch((model) => ({
        ...model,
        barWidth: w,
        dragging: true,
        initialMouse: x,
        initialPos: model.pos,
      }));
    },
  [Action.Move]:
    (patch, jumpTo, length, x) => {
      patch((model) => {
        const newPos = restrict(0, 1, model.initialPos + (x - model.initialMouse) / model.barWidth);
        return {
          ...model,
          pos: newPos,
        };
      });
    },
  [Action.End]:
    (patch) => {
      patch((model) => ({
        ...model,
        dragging: false,
        initialMouse: 0,
        initialPos: 0,
      }));
    },
};

// View

interface Props {
  model: Model;
  act: ActionHandler;
  jumpTo: (x: number) => void;
  clear: () => void;
  current: number;
  length: number;
}

const cls = (c: string, disabled: boolean) => ({
  [css.button]: true,
  [c]: true,
  [css.disabled]: disabled,
});

const mouseEvent = (event: MouseEvent) =>
  event.preventDefault() || [event.clientX];

const mouseEventW = (event: MouseEvent) =>
  event.preventDefault() || [
    event.clientX,
    ((event.target as HTMLElement).parentNode as HTMLElement).offsetWidth,
  ];

const view = ({model, act, jumpTo, clear, current, length}: Props) => {
  const hasPrev = current > 0;
  const hasNext = current < length - 1;
  const canClear = length > 1;
  const jumpBack = hasPrev ? jumpTo(current - 1) : undefined;
  const jumpNext = hasNext ? jumpTo(current + 1) : undefined;
  return (
    <div class={css.scrubber}>
      <div class={css.buttons}>
        <button class={cls(css.prev, !hasPrev)} on-click={jumpBack}>previous state</button>
        <button class={cls(css.clear, !canClear)} on-click={canClear ? clear() : undefined}>clear history</button>
        <button class={cls(css.next, !hasNext)} on-click={jumpNext}>next state</button>
      </div>
      <div
        class={css.progress}
      >
        <div class={css.bar}>
          <div
            class={{[css.handle]: true, [css.activeHandle]: model.dragging}}
            style={{left: `${model.pos * 100}%`, tranition: model.dragging ? "" : "all 0.2s"}}
            on-mousedown={from(mouseEventW, act(Action.Start))}
            doc-mousemove={model.dragging ? from(mouseEvent, act(Action.Move, jumpTo, length)) : undefined}
            doc-mouseup={model.dragging ? from(mouseEvent, act(Action.End)) : undefined}
            />
          </div>
      </div>
      <div class={css.position}>
        {current + 1} : {length}
      </div>
    </div>
  );
};

export {
  Model,
  init,
  Action,
  actions,
  Props,
  view,
};
