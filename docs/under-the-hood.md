# Under the hood

The Duckweed devtool is itself a Duckweed application. When you load the
devtools into your application, you are running two Duckweed applications
side-by-side, and the plugins and middleware exposed by the devtool facilitate
the communication between the devtool and your app.

## The box contents

Devtool is packaged as a single JavaScript file which injects stylesheets and
creates the UI within the `<body>` element. The single JS file includes all the
dependencies such as Snabbdom, and the Duckweed itself.

## The middleware and the plugin

When the devtool starts, it will create a global object
`window.__DUCKWEED_DEVTOOL__`. This object has two properties, `middleware` and
`plugin`. These should be added to the
[`middleware`](https://github.com/foxbunny/duckweed/blob/master/docs/api/runner.md#middleware-array-of-middleware-functions)
and
[`plugins`](https://github.com/foxbunny/duckweed/blob/master/docs/api/runner.md#plugins-array-of-plugin-objects)
options respectively.

The middleware portion of the devtool will notify the devtool every time
something in your application calls the model patcher. It will record the time
when this happened, and the time it took for the patcher to do the patching.

The plugin portion allows the devtool to inject the state into your application.

## Channels

The communication between the devtool app, its middleware, and its plugin, is
performed through message channels. This is a simple synchronous event system
(see `src/util/messaging.ts`) which lets the different parts of the devtool to
send messages to each other. When middleware sees a hange in the model, it sends
a message to the app which updates its internal state history data. When the
user tries to jump to older state, the app notifies the plugin to inject the
state in your application. And so on.

## The state history

The state change history is stored as an object that knows when the change
happened, how long it took, the state before, and the state after, as well as
the diff between the states. All this data is kept in memory until cleared by
the user or overwritten by new state changes (more on that in the manual).

It's important to understand that, when jumping to different application states,
the devtool only injects the model state. It does not modify the application's
VDOM nor does it change other states the application may rely on (e.g.,
`localStorage`). Because of this, the ability for the devtool to perfectly
replicate some previous conditions hinges on how well-behaved your application
is. **As long as your views are strictly a function of the model state, the
devtool will do a reasonably good job of replicating previous state.**
