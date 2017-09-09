/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

import * as duckweed from "duckweed";

import * as devtool from "./devtool";
import * as panel from "./panel";

(window as any).__DUCKWEED_DEVTOOL__ = {
  middleware: devtool.clientMiddleware,
  plugin: devtool.clientPlugin,
};

const root = document.createElement("div");
document.body.appendChild(root);

duckweed.runner(panel.init(), panel.actions, panel.view, {
  plugins: [devtool.hostPlugin],
  root,
});
