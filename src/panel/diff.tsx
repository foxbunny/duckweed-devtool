/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

const css = require<CSSModule>("./diff.styl");

import * as duckweed from "duckweed";
import {ActionHandler, Actions} from "duckweed/runner";
import {Diff} from "util/diff";
import * as is from "util/is";

// Model

interface Model {
  diff: any;
  scope: any[];
}

const init = (): Model => ({
  diff: null,
  scope: [],
});

// Actions

enum Action {
  PushScope = "PushScope",
  SetScope = "SetScope",
}

const actions: Actions = {
  [Action.PushScope]:
    (patch, key) => {
      patch((model) => ({
        ...model,
        scope: model.scope.concat(key),
      }));
    },
  [Action.SetScope]:
    (patch, index: number | null) => {
      patch((model) => ({
        ...model,
        scope: index === null ? [] : model.scope.slice(0, index + 1),
      }));
    },
};

// View

interface Props {
  model: Model;
  act: ActionHandler;
}

const diffValue = (d: Diff): any => {
  switch (d.type) {
    case "del":
      return d.prev;
    default:
      return d.next;
  }
};

const scoped = (scope: any[], obj: any): any =>
  typeof obj === "undefined" || scope.length === 0
    ? obj
    : scoped(scope.slice(1), isDiff(obj) ? diffValue(obj)[scope[0]] : obj[scope[0]]);

const isDiff = (diff: any): diff is Diff =>
  diff instanceof Diff;

const diffView = (act: ActionHandler, diff: Diff) => (
  <span class={css[diff.type]}>
    {diff.type === "del"
      ? JSON.stringify(diff.prev)
      : valueView(act, diff.next)
    }
  </span>
);

const renderValue = (act: ActionHandler, v: any, k?: any, extraClass: string[] = []) => {
  if (is.container(v)) {
    return [
      <span class={[css.expandObject].concat(extraClass)} on-click={k ? act(Action.PushScope, k) : undefined}>
        {is.pojo(v) ? "{}" : "[]"}
      </span>,
      <span class={css.preview}>
        {JSON.stringify(v)}
      </span>,
    ];
  }
  return <span class={extraClass}>{"" + v}</span>;
};

const objDiff = (act: ActionHandler, obj: any): JSX.Element => (
  <div class={css.obj}>
    {Object.keys(obj).map((k) => [k, obj[k]]).map(([k, v]) =>
      <div class={css.keyVal}>
        <span class={css.key}>{k}:</span>
        <span class={css.val}>
          {(() => {
            if (isDiff(v)) {
              return renderValue(act, v.next, k, [css[v.type]]);
            }
            return renderValue(act, v, k);
          })()}
        </span>
      </div>,
    )}
  </div>
);

const valueView = (act: ActionHandler, v: any): string | JSX.Element => {
  if (isDiff(v)) {
    return diffView(act, v);
  }
  if (is.container(v)) {
    return objDiff(act, v);
  }
  return "" + v;
};

const view = ({model, act}: Props) => (
  <div class={css.diffPane}>
    <div class={css.breadcrumbs}>
      {model.scope.length
        ? [
          <button class={[css.crumbButton, css.toRoot]} on-click={act(Action.SetScope, null)}>
            go to root
          </button>,
          <button class={[css.crumbButton, css.upOne]} on-click={act(Action.SetScope, model.scope.length - 2)}>
            up one level
          </button>,
        ]
        : "Model"
      }
      {model.scope.map((key, index) =>
        <span class={css.crumb} on-click={act(Action.SetScope, index)}>
          {key}
        </span>,
      )}
    </div>
    <div class={css.inspector}>
      {valueView(act, scoped(model.scope, model.diff))}
    </div>
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
