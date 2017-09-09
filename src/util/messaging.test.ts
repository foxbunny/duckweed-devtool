/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

import {createChannel} from "./messaging";

describe("messaging", () => {
  it("Should be able to connect the listener and triggerer", () => {
    const hub = createChannel();
    const listener = jest.fn();
    hub.addListener(listener);
    hub.send("foo", 1, false);
    expect(listener).toHaveBeenCalledWith("foo", 1, false);
  });

  it("Should be able to remove a listener", () => {
    const hub = createChannel();
    const listener = jest.fn();
    hub.addListener(listener);
    hub.removeListener(listener);
    hub.send("foo", 1, false);
    expect(listener).not.toHaveBeenCalled();
  });

  it("Should allow multiple listeners to listen", () => {
    const hub = createChannel();
    const l1 = jest.fn();
    const l2 = jest.fn();
    hub.addListener(l1);
    hub.addListener(l2);
    hub.send("foo");
    expect(l1).toHaveBeenCalledWith("foo");
    expect(l2).toHaveBeenCalledWith("foo");
  });
});
