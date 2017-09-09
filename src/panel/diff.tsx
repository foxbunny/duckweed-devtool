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
  SetScope = "PopScope",
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
        scope: index ? model.scope.slice(0, index + 1) : [],
      }));
    },
};

// View

interface Props {
  model: Model;
  act: ActionHandler;
}

const scoped = (scope: any[], obj: any): any =>
  typeof obj === "undefined" || scope.length === 0
    ? obj
    : scoped(scope.slice(1), obj[scope[0]]);

const isDiff = (diff: any): diff is Diff =>
  diff instanceof Diff;

const diffView = (diff: Diff) => (
  <span class={css[diff.type]}>
    {diff.next}
  </span>
);

const renderValue = (act: ActionHandler, k: any, v: any, extraClass: string[] = []) => {
  if (is.container(v)) {
    return [
      <span class={[css.expandObject].concat(extraClass)} on-click={act(Action.PushScope, k)}>
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
              if (v.type === "ident") {
                return renderValue(act, k, v.next);
              }
              return renderValue(act, k, v.next, [css[v.type]]);
            }
            return renderValue(act, k, v);
          })()}
        </span>
      </div>,
    )}
  </div>
);

const valueView = (act: ActionHandler, v: any): string | JSX.Element => {
  if (isDiff(v)) {
    return diffView(v);
  }
  if (is.container(v)) {
    return objDiff(act, v);
  }
  return "" + v;
};

const view = ({model, act}: Props) => (
  <div class={css.diffPane}>
    <div class={css.breadcrumbs}>
      <span class={css.crumb} on-click={act(Action.SetScope, null)}>
        (root)
      </span>
      {model.scope.map((key, index, keys) =>
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
