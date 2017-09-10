# Duckweed devtool

Developer tool that allows developers to inspect the
[Duckweed](https://github.com/foxbunny/duckweed) application model state.

The Duckweed devtool is a proper web application that runs alongside your main
application, in the same tab, and monitors the application state changes. Its
interface allows you to inspect the application state and also rewind the
application to a previous state.

## Features

- Time travel
- Model state inspection
- In-browser (no extensions, works in any reasonably modern browser)

## Installation

npm install --save-dev duckweed-devtool

## Usage

Include the package in the webpack bundle alongside your app:

```javascript
// Webpack config
// ...

module.export = function (env) {
 return {
   // ...
   entry: env && env.devtool === "yes"
    ? ["duckweed-devtool", "./src/index.js"]
    : ["./src/index.js"],
  // ...
 };
};
```

When invoking `duckweed.runner()` pass `window.__DUCKWEED_DEVTOOL__.middlware`
and `window.__DUCKWEED_DEVTOOL__.plugin` as appropriate options:

```javascript
const {plugin, middleware} = window.__DUCKWEED_DEVTOOL__ || {};
duckweed.runner(model, actions, views, {
  plugins: plugin ? [plugin] : [],
  middleware: middleware ? [middleware] : [],
});
```

## How it works

For the information on how to use the devtool, see the [User manual](./docs/manual.md).

For the technical information, see the [Under the hood](./docs/under-the-hood.md).

## Limitations

The following conditions may cause the devtool to behave in unexpected ways:

### You patch the model in Snabbdom hooks

You patched the model in a hook, and then rewind the state in the devtool to a
state that causes the hook to trigger. A new state change occurs at that point,
causing the state *after* the last-selected state to be erased. This is not a
bug. Devtool is designed to do that.

### You use state other than the one in the model

If you use global state, like `window.location`, that is outside Duckweed's
control, the time travel may not work as expected. Access to such state should
be limited to event handlers and the rest of the apps should use the model state
exclusively.

### You use `document.body` as your root

If your application uses `document.body` as the root, it will overwrite the
devtool's UI elements. Currently the only solution is to use a different root.

### Dependencies are duplicated

Both your app and the devtool will use the same core dependencies (Snabbdom,
Duckweed itself, etc). Since the devtool comes pre-bundled with them as well as
an ES6 `Object.assign()` shim, there could be some duplication. Keep in mind,
though, that the devtool does not necessarily use the same versions of those
dependencies as your app, and that the devtool should not end up in the
production bundle anyway, so it's fine that the dependencies are duplicated.

### No Chrome extension

Because Duckweed application state can store any type of object (i.e., objects
that are not necessarili serializable), writing a Chrome extension for this tool
is a bit involved. I originally planned on having just a Chrome extension, but
the final conslusion was that creating a tool that would run in-browser is
probably faster.

Having said that, the current design is a bit too intrusive. In future, the
devtool may provide a development server that will host your app in an iframe,
for much cleaner separation of the two programs.

## License

This software is made available to you under the terms of the MIT liecense.
Please see the full text of the license in the `LICENSE` file in the source
tree.
