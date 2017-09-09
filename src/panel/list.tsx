/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

const css = require<CSSModule>("./list.styl");

import * as duckweed from "duckweed";

interface Item {
  active: boolean;
  time: number;
  index: number;
}

// View

interface Props {
  items: Item[];
  activate: (index: number) => (e: Event) => void;
}

const view = ({items, activate}: Props) => (
  <ul>
    {items.map((item) => (
      <li class={{[css.listItem]: true, [css.activeItem]: item.active}} on-click={activate(item.index)}>
        {item.time}
      </li>
    ))}
  </ul>
);

export {
  Item,
  Props,
  view,
};
