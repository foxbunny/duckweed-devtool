# Duckweed developer tool

Developer tool that allows developers to inspect the
[Duckweed](https://github.com/foxbunny/duckweed) application model state.

## TODO

- [x] Time travel
- [x] Model inspector
- [x] Polish the UI
- [ ] Export and import application state
- [ ] Tests
- [ ] Publish on NPM

## Installation

TODO

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

## Limitations

The devtool will not work as expected if you patch the model in Snabbdom hooks.

## License

This software is made available to you under the terms of the MIT liecense.
Please see the full text of the license in the `LICENSE` file in the source
tree.
