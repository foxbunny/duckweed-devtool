/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var events = __webpack_require__(15);
exports.events = events;
var html_1 = __webpack_require__(5);
exports.html = html_1.default;
var runner_1 = __webpack_require__(31);
exports.runner = runner_1.default;
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = __webpack_require__(6);
var is = __webpack_require__(7);
function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;
;
exports.default = h;
//# sourceMappingURL=h.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(36);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var str = function (s) {
    return typeof s === "string";
};
exports.str = str;
var input = function (target) {
    return target.tagName === "INPUT";
};
exports.input = input;
var checkbox = function (target) {
    return target.tagName === "INPUT" && target.type === "checkbox";
};
exports.checkbox = checkbox;
var event = function (ev) {
    return ev instanceof Event;
};
exports.event = event;
var changeEvent = function (ev) {
    return event(ev) && ev.type === "change";
};
exports.changeEvent = changeEvent;
var inputEvent = function (ev) {
    return event(ev) && ev.type === "input";
};
exports.inputEvent = inputEvent;
var vnode = function (vn) {
    return typeof vn === "object" && "sel" in vnode;
};
exports.vnode = vnode;
var pathData = function (data) {
    return typeof data === "object" && typeof data.pathname === "string";
};
exports.pathData = pathData;
//# sourceMappingURL=is.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var snabbdom = __webpack_require__(16);
var h_1 = __webpack_require__(1);
var class_1 = __webpack_require__(19);
var eventlisteners_1 = __webpack_require__(20);
var props_1 = __webpack_require__(21);
var style_1 = __webpack_require__(22);
var docevents_1 = __webpack_require__(23);
var keyevents_1 = __webpack_require__(24);
var offevents_1 = __webpack_require__(25);
var routeevents_1 = __webpack_require__(26);
var patch = snabbdom.init([
    class_1.default,
    style_1.default,
    eventlisteners_1.default,
    props_1.default,
    docevents_1.default,
    offevents_1.default,
    keyevents_1.default,
    routeevents_1.default,
]);
exports.patch = patch;
var isInlineChild = function (obj) {
    return typeof obj === "object" && obj !== null && typeof obj.vnodes !== "undefined";
};
var prepareClasses = function (classes) {
    if (classes == null) {
        return {};
    }
    if (typeof classes === "object" && !Array.isArray(classes)) {
        return classes;
    }
    if (typeof classes === "string") {
        return _a = {}, _a[classes] = true, _a;
    }
    return classes.reduce(function (o, c) {
        o[c] = true;
        return o;
    }, {});
    var _a;
};
var prepareProps = function (props) {
    if (props == null) {
        return {};
    }
    var finalProps = {};
    Object.keys(props).forEach(function (prop) {
        var _a = __read(prop.split("-"), 2), mod = _a[0], sub = _a[1];
        if (sub) {
            finalProps[mod] = finalProps[mod] || {};
            finalProps[mod][sub] = props[prop];
        }
        else if (prop === "key") {
            finalProps.key = props[prop];
        }
        else if (prop === "on") {
            finalProps.on = props[prop];
        }
        else if (prop === "hook") {
            finalProps.hook = props[prop];
        }
        else if (prop === "class") {
            finalProps.class = prepareClasses(props[prop]);
        }
        else if (prop === "style") {
            finalProps.style = props[prop];
        }
        else if (prop === "route") {
            finalProps.route = props[prop];
        }
        else {
            finalProps.props = finalProps.props || {};
            finalProps.props[prop] = props[prop];
        }
    });
    return finalProps;
};
var renderIntrinsic = function (elm, props, children) {
    if (props === void 0) { props = {}; }
    if (children === void 0) { children = []; }
    // FIXME: We're messing with any a lot here
    children = (children.length === 1
        ? children[0]
        : children.reduce(function (arr, c) {
            if (isInlineChild(c)) {
                // Case where we have something like `{props.__inner}` somewhere in the
                // render functions.
                return arr.concat(c.__vnodes);
            }
            if (Array.isArray(c)) {
                // Case where we have something like `{arr.map(() => ...)}`
                return arr.concat(c);
            }
            return arr.concat([c]);
        }, []));
    return h_1.default(elm, prepareProps(props), children);
};
var renderFunction = function (func, props, children) {
    if (props === void 0) { props = {}; }
    if (children === void 0) { children = []; }
    var key = props && props.key;
    if (key) {
        delete props.key;
    }
    var vnode = func(props, { __vnodes: children || [] });
    vnode.key = vnode.key || key;
    return vnode;
};
var html = function (elm, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (typeof elm === "string") {
        return renderIntrinsic(elm, props, children);
    }
    else {
        return renderFunction(elm, props, children);
    }
};
exports.html = html;
exports.default = html;
//# sourceMappingURL=html.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;
//# sourceMappingURL=vnode.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;
//# sourceMappingURL=is.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var diff_1 = __webpack_require__(9);
var messaging_1 = __webpack_require__(32);
// NOTE: In this module 'client' is the devtool, and 'host' is the application
// being tested
var client2host = messaging_1.createChannel();
exports.client2host = client2host;
var host2client = messaging_1.createChannel();
exports.host2client = host2client;
var clientMiddleware = function (fn) { return function (model) {
    var before = model;
    var start = (new Date()).getTime();
    var after = fn(model);
    var duration = (new Date()).getTime() - start;
    client2host.send("modelUpdate", { start: start, duration: duration, before: before, after: after });
    return after;
}; };
exports.clientMiddleware = clientMiddleware;
var clientPlugin = {
    actions: {
        injectState: function (patch, state) {
            patch(function () { return state; });
        },
    },
    init: function (act, state) {
        host2client.addListener(act);
        client2host.send("initHistory", state.model);
    },
};
exports.clientPlugin = clientPlugin;
var hostPlugin = {
    actions: {
        initHistory: function (patch, initialModel) {
            patch(function (model) { return (__assign({}, model, { diff: {
                    diff: initialModel,
                    scope: [],
                }, history: model.history.concat({
                    after: initialModel,
                    before: undefined,
                    diff: initialModel,
                    duration: 0,
                    start: (new Date()).getTime(),
                }), scrubber: __assign({}, model.scrubber, { pos: 1 }) })); });
        },
        modelUpdate: function (patch, _a) {
            var start = _a.start, duration = _a.duration, before = _a.before, after = _a.after;
            patch(function (model) {
                if (after === model.history[model.currentIndex].after) {
                    // This is the injected state, so we're ignoring it
                    return;
                }
                var isRewound = model.currentIndex < model.history.length - 1;
                var historyBase = isRewound
                    ? model.history.slice(0, model.currentIndex + 1)
                    : model.history;
                var diffObj = diff_1.default(before, after);
                var newIndex = model.currentIndex + 1;
                return __assign({}, model, { currentIndex: newIndex, diff: {
                        diff: diffObj,
                        scope: model.diff.scope,
                    }, history: historyBase.concat({
                        after: after,
                        before: before,
                        diff: diffObj,
                        duration: duration,
                        start: start,
                    }), scrubber: __assign({}, model.scrubber, { pos: 1 }) });
            });
        },
    },
    init: function (act, state) {
        client2host.addListener(act);
    },
};
exports.hostPlugin = hostPlugin;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var is = __webpack_require__(10);
var Diff = /** @class */ (function () {
    function Diff(type, prev, next) {
        this.type = type;
        this.prev = prev;
        this.next = next;
    }
    Diff.ident = function (val) {
        return new Diff("ident", val, val);
    };
    Diff.update = function (prev, next) {
        return new Diff("update", prev, next);
    };
    Diff.add = function (val) {
        return new Diff("add", undefined, val);
    };
    Diff.del = function (val) {
        return new Diff("del", val, undefined);
    };
    return Diff;
}());
exports.Diff = Diff;
function diff(x, y) {
    if (x === y) {
        return Diff.ident(x);
    }
    if (is.undef(x)) {
        return Diff.add(y);
    }
    if (is.undef(y)) {
        return Diff.del(x);
    }
    if (is.primitive(x) && is.primitive(y)) {
        // Both primitive, so there's nothing deeper to consider
        return Diff.update(x, y);
    }
    if (is.primitive(x) || is.primitive(y)) {
        // One of them is a primitive, so we won't go deeper
        return Diff.update(x, y);
    }
    // At this point, we've exhausted the possibility of having primitives on
    // either side. They should all be either objects or arrays.
    if (is.pojo(x) && is.array(y) || is.array(x) && is.pojo(y)) {
        return Diff.update(x, y);
    }
    if (is.pojo(x)) {
        var uniqKyes = Array.from(new Set(Object.keys(x).concat(Object.keys(y))));
        return uniqKyes.reduce(function (out, k) {
            out[k] = diff(x[k], y[k]);
            return out;
        }, {});
    }
    return (function () {
        var l = Math.max(x.length, y.length);
        var out = [];
        for (var i = 0; i < l; i++) {
            out.push(diff(x[i], y[i]));
        }
        return out;
    })();
}
exports.default = diff;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var primitive = function (val) {
    return val === null || typeof val !== "object" && typeof val !== "function";
};
exports.primitive = primitive;
var container = function (val) {
    return typeof val === "object" && val !== null;
};
exports.container = container;
var pojo = function (val) {
    return container(val) && val.constructor === Object;
};
exports.pojo = pojo;
var array = function (val) {
    return Array.isArray(val);
};
exports.array = array;
var func = function (val) {
    return typeof val === "function";
};
exports.func = func;
var undef = function (val) {
    return typeof val === "undefined";
};
exports.undef = undef;
var NULL = function (val) {
    return val === null;
};
exports.NULL = NULL;
var nil = function (val) {
    return val == null;
};
exports.nil = nil;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(12);
module.exports = __webpack_require__(14);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(13).polyfill();


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var duckweed = __webpack_require__(0);
var devtool = __webpack_require__(8);
var panel = __webpack_require__(33);
window.__DUCKWEED_DEVTOOL__ = {
    middleware: devtool.clientMiddleware,
    plugin: devtool.clientPlugin,
};
var root = document.createElement("div");
document.body.appendChild(root);
duckweed.runner(panel.init(), panel.actions, panel.view, {
    plugins: [devtool.hostPlugin],
    root: root,
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var is = __webpack_require__(4);
/**
 * Decorates an event handler with a processor
 */
var from = function (processor, handler) { return function () {
    var eventArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eventArgs[_i] = arguments[_i];
    }
    return handler.apply(void 0, __spread(processor.apply(void 0, __spread(eventArgs))));
}; };
exports.from = from;
/**
 * Processor that handles input DOM events
 */
var inputEvent = function (event) {
    return [event.target.value];
};
exports.inputEvent = inputEvent;
/**
 * Processor that handles change DOM events on checkboxes
 */
var checkboxEvent = function (event) {
    return [event.target.checked, event.target.value];
};
exports.checkboxEvent = checkboxEvent;
/**
 * Automatic processor that handles various events and hooks
 */
var auto = function () {
    var eventCallbackArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eventCallbackArgs[_i] = arguments[_i];
    }
    var first = eventCallbackArgs[0];
    if (is.vnode(first)) {
        // This is mostly for hooks. We add the vnode objects to args.
        return eventCallbackArgs;
    }
    else if (is.changeEvent(first) && is.checkbox(first.target)) {
        return checkboxEvent(first);
    }
    else if (is.inputEvent(first) && is.input(first.target)) {
        first.preventDefault();
        return inputEvent(first);
    }
    else if (is.pathData(first)) {
        return [first];
    }
    return [];
};
exports.auto = auto;
//# sourceMappingURL=events.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = __webpack_require__(6);
var is = __webpack_require__(7);
var htmldomapi_1 = __webpack_require__(17);
function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = vnode_1.default('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
var h_1 = __webpack_require__(1);
exports.h = h_1.h;
var thunk_1 = __webpack_require__(18);
exports.thunk = thunk_1.thunk;
function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode_1.default(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
exports.init = init;
//# sourceMappingURL=snabbdom.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
exports.default = exports.htmlDomApi;
//# sourceMappingURL=htmldomapi.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var h_1 = __webpack_require__(1);
function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
        return;
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
exports.thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return h_1.h(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
exports.default = exports.thunk;
//# sourceMappingURL=thunk.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
exports.default = exports.classModule;
//# sourceMappingURL=class.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") {
        // call function handler
        handler.call(vnode, event, vnode);
    }
    else if (typeof handler === "object") {
        // call handler with arguments
        if (typeof handler[0] === "function") {
            // special case for single argument for performance
            if (handler.length === 2) {
                handler[0].call(vnode, handler[1], event, vnode);
            }
            else {
                var args = handler.slice(1);
                args.push(event);
                args.push(vnode);
                handler[0].apply(vnode, args);
            }
        }
        else {
            // call multiple handlers
            for (var i = 0; i < handler.length; i++) {
                invokeHandler(handler[i]);
            }
        }
    }
}
function handleEvent(event, vnode) {
    var name = event.type, on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;
    // optimization for reused immutable handlers
    if (oldOn === on) {
        return;
    }
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener(name, oldListener, false);
            }
        }
        else {
            for (name in oldOn) {
                // remove listener if existing listener removed
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false);
                }
            }
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        var listener = vnode.listener = oldVnode.listener || createListener();
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false);
            }
        }
        else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false);
                }
            }
        }
    }
}
exports.eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};
exports.default = exports.eventListenersModule;
//# sourceMappingURL=eventlisteners.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
exports.default = exports.propsModule;
//# sourceMappingURL=props.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;
    if (!oldStyle && !style)
        return;
    if (oldStyle === style)
        return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            }
            else {
                elm.style[name] = '';
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed' && style.delayed) {
            for (var name2 in style.delayed) {
                cur = style.delayed[name2];
                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                    setNextFrame(elm.style, name2, cur);
                }
            }
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            }
            else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style, name, elm = vnode.elm, s = vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
exports.styleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};
exports.default = exports.styleModule;
//# sourceMappingURL=style.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var invokeHandler = function (handler, vnode, event) {
    if (typeof handler === "function") {
        handler.call(vnode, event, vnode);
    }
    else {
        var _a = __read(handler), func = _a[0], args = _a.slice(1);
        func.call.apply(func, __spread([vnode], args, [event, vnode]));
    }
};
var handleEvent = function (event, vnode) {
    var name = event.type;
    var doc = vnode.data.doc;
    if (doc && doc[name]) {
        invokeHandler(doc[name], vnode, event);
    }
};
var createListener = function (container) {
    var handler = function (event) {
        handleEvent(event, handler.vnode);
    };
    return handler;
};
var updateListeners = function (oldVNode, vnode) {
    var oldDoc = oldVNode.data.doc;
    var doc = vnode && vnode.data.doc;
    // Optimization for reused immutable handlers
    if (oldDoc === doc) {
        return;
    }
    var oldListener = oldVNode.docListener;
    // Remove existing listeners
    if (oldDoc && oldListener) {
        Object.keys(oldDoc)
            .filter(function (name) { return !doc || !(name in doc); })
            .forEach(function (name) {
            document.removeEventListener(name, oldListener, false);
        });
    }
    var elm = (vnode && vnode.elm);
    // Add new listeners if necessary
    if (doc) {
        var listener_1 = vnode.docListener || oldVNode.docListener || createListener(elm);
        listener_1.vnode = vnode;
        vnode.docListener = listener_1;
        Object.keys(doc)
            .filter(function (name) { return !oldDoc || !(name in oldDoc); })
            .forEach(function (name) {
            document.addEventListener(name, listener_1, false);
        });
    }
};
var module = {
    create: updateListeners,
    destroy: updateListeners,
    update: updateListeners,
};
exports.module = module;
exports.default = module;
//# sourceMappingURL=docevents.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 *
 * Loosely based on snabbdom/src/modules/eventlisteners.ts
 *
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var keyCodeMap = {
    8: "backspace",
    9: "tab",
    13: "enter",
    27: "escape",
    33: "pageup",
    34: "pagedown",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    46: "delete",
};
var invokeHandler = function (handler, vnode, event) {
    if (typeof handler === "function") {
        handler.call(vnode, event, vnode);
    }
    else {
        var _a = __read(handler), func = _a[0], args = _a.slice(1);
        func.call.apply(func, __spread([vnode], args, [event, vnode]));
    }
};
var handleEvent = function (event, vnode) {
    var name = keyCodeMap[event.keyCode];
    if (!name) {
        return;
    }
    var keys = vnode.data.keys;
    if (keys && keys[name]) {
        invokeHandler(keys[name], vnode, event);
    }
};
var createListener = function (container) {
    var handler = function (event) {
        handleEvent(event, handler.vnode);
    };
    return handler;
};
var updateListeners = function (oldVNode, vnode) {
    var oldKeys = oldVNode.data.keys;
    var keys = vnode && vnode.data.keys;
    // Optimization for reused immutable handlers
    if (oldKeys === keys) {
        return;
    }
    var oldListener = oldVNode.keysListener;
    var elm = (vnode && vnode.elm);
    // Remove existing listeners
    if (oldKeys && oldListener) {
        var remainingKeys = Object.keys(oldKeys).filter(function (key) { return !keys || !(key in keys); });
        if (!remainingKeys.length) {
            elm.removeEventListener("keyup", oldListener, false);
        }
    }
    // Add new listeners if necessary
    if (keys && Object.keys(keys).length) {
        var listener = vnode.keysListener || oldVNode.keysListener || createListener(elm);
        listener.vnode = vnode;
        vnode.keysListener = listener;
        elm.addEventListener("keyup", listener, false);
    }
};
var module = {
    create: updateListeners,
    destroy: updateListeners,
    update: updateListeners,
};
exports.module = module;
exports.default = module;
//# sourceMappingURL=keyevents.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 *
 * Loosely based on snabbdom/src/modules/eventlisteners.ts
 *
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var invokeHandler = function (handler, vnode, event) {
    if (typeof handler === "function") {
        handler.call(vnode, event, vnode);
    }
    else {
        var _a = __read(handler), func = _a[0], args = _a.slice(1);
        func.call.apply(func, __spread([vnode], args, [event, vnode]));
    }
};
var handleEvent = function (event, vnode) {
    var name = event.type;
    var off = vnode.data.off;
    if (off && off[name]) {
        invokeHandler(off[name], vnode, event);
    }
};
var createListener = function (container) {
    var handler = function (event) {
        if (container.contains(event.target)) {
            // Event target it inside the container so we're not interested.
            return;
        }
        // We will only handle events that are triggered outside the container.
        handleEvent(event, handler.vnode);
    };
    return handler;
};
var updateListeners = function (oldVNode, vnode) {
    var oldOff = oldVNode.data.off;
    var off = vnode && vnode.data.off;
    // Optimization for reused immutable handlers
    if (oldOff === off) {
        return;
    }
    var oldListener = oldVNode.offListener;
    // Remove existing listeners
    if (oldOff && oldListener) {
        Object.keys(oldOff)
            .filter(function (name) { return !off || !(name in off); })
            .forEach(function (name) {
            document.removeEventListener(name, oldListener, false);
        });
    }
    var elm = (vnode && vnode.elm);
    // Add new listeners if necessary
    if (off) {
        var listener_1 = vnode.offListener || oldVNode.offListener || createListener(elm);
        listener_1.vnode = vnode;
        vnode.offListener = listener_1;
        Object.keys(off)
            .filter(function (name) { return !oldOff || !(name in oldOff); })
            .forEach(function (name) {
            document.addEventListener(name, listener_1, false);
        });
    }
};
var module = {
    create: updateListeners,
    destroy: updateListeners,
    update: updateListeners,
};
exports.module = module;
exports.default = module;
//# sourceMappingURL=offevents.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var qs = __webpack_require__(27);
var handleEvent = function (data, vnode) {
    var route = vnode.data.route;
    if (typeof route === "function") {
        route(data);
    }
};
var createListener = function () {
    var handler = function (event) {
        var pathData = {
            hash: location.hash,
            params: qs.parse(location.search),
            pathname: location.pathname,
            query: location.search,
            type: "popstate",
        };
        handleEvent(pathData, handler.vnode);
    };
    return handler;
};
var updateListener = function (oldVNode, vnode) {
    var oldRoute = oldVNode.data.route;
    var route = vnode && vnode.data.route;
    if (oldRoute === route) {
        return;
    }
    var oldListener = oldVNode.routeListener;
    // Remove existing listener
    if (oldRoute && oldListener) {
        window.removeEventListener("popstate", oldListener, false);
    }
    if (route) {
        var listener = createListener();
        listener.vnode = vnode;
        vnode.routeListener = listener;
        window.addEventListener("popstate", listener, false);
    }
};
var module = {
    create: updateListener,
    destroy: updateListener,
    update: updateListener,
};
exports.module = module;
exports.default = module;
//# sourceMappingURL=routeevents.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(28);
var objectAssign = __webpack_require__(29);
var decodeComponent = __webpack_require__(30);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(5);
var is = __webpack_require__(4);
/**
 * Clears the timer if one was set by the patch function.
 */
var cancelNextRender = function (state) {
    if (state.nextRenderId) {
        clearTimeout(state.nextRenderId);
        state.nextRenderId = null;
    }
};
/**
 * Cancel the next-scheduled render, and reschedule another render
 */
var setNextRender = function (state, render) {
    cancelNextRender(state);
    state.nextRenderId = setTimeout(render);
};
/**
 * Create a renderer function
 *
 * The renderer function will keep updating the vnodes stored in the runner
 * state using a specified view function.
 */
var createRenderer = function (state, patch, view) {
    return function (actionHandler) {
        state.vnodes = patch(state.vnodes, view({ model: state.model, act: actionHandler }));
        state.nextRenderId = null;
    };
};
/**
 * Retrieves the value within an object, at given scope.
 */
var scopeGet = function (scope, object) {
    return scope.length
        ? scopeGet(scope.slice(1), object[scope[0]])
        : object;
};
/**
 * Returns a copy of the object with the value assigned to the property at specified scope
 */
var scopeSet = function (scope, val, object) {
    if (scope.length === 0) {
        return val;
    }
    var _a = __read(scope), first = _a[0], rest = _a.slice(1);
    return Array.isArray(object)
        ? (function () {
            var copy = object.concat([]);
            copy[first] = scopeSet(rest, val, copy[first]);
            return copy;
        })()
        : __assign({}, object, (_b = {}, _b[first] = scopeSet(rest, val, object[first]), _b));
    var _b;
};
var scopePatch = function (scope, fn, object) {
    return scopeSet(scope, fn(scopeGet(scope, object)), object);
};
var createPatcher = function (state, middleware, patchCallback, scope, parentScope, scopeCallback) {
    if (scope === void 0) { scope = []; }
    if (parentScope === void 0) { parentScope = []; }
    if (scopeCallback === void 0) { scopeCallback = function (model) { return model; }; }
    var mutate = function (fn) { return function (model) {
        var updated = scope
            ? scopePatch(scope, fn, model)
            : fn(model);
        return scopePatch(parentScope, scopeCallback, updated);
    }; };
    var patcher = function (fn) {
        state.model = middleware(mutate(fn))(state.model);
        patchCallback();
    };
    patcher.as = function (childScope, parentCallback) {
        var patcherScope = scope ? scope.concat(childScope) : childScope;
        return createPatcher(state, middleware, patchCallback, patcherScope, scope, parentCallback);
    };
    return patcher;
};
var actionHandlerFactory = function (patcher, actions, prefix) {
    if (prefix === void 0) { prefix = []; }
    var handler = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function () {
            var eventArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                eventArgs[_i] = arguments[_i];
            }
            var _a = __read(prefix.concat(args, eventArgs)), action = _a[0], actionArgs = _a.slice(1);
            if (action == null) {
                return;
            }
            var actionFn = actions[action];
            if (!actionFn) {
                throw Error("No action found for message [" + action + ", " + actionArgs.join(", ") + "]");
            }
            actionFn.apply(void 0, __spread([patcher], actionArgs));
        };
    };
    handler.as = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return actionHandlerFactory(patcher, actions, prefix.concat(args));
    };
    handler.prefix = prefix;
    return handler;
};
/**
 * Create an action handler
 *
 * Action handler is a proxy event/hook handler factory which allows the user to
 * specify messages which will then be tied to action handlers when the events
 * trigger.
 *
 * A message constists of an action identifier, and zero or more arbitrary
 * user-specified arguments. The message is specified in the prop, and it is
 * passsed to the action handler, which returns an event handler that is used by
 * Snabbdom to handle the events. When an event is triggered, the control is
 * returned to the action handler which uses the original message to determine
 * which action handler will be invoked.
 */
var createActionHandler = function (state, actions, render, middleware) {
    var patcher = createPatcher(state, middleware, function () { return setNextRender(state, function () { return render(handler); }); });
    var handler = actionHandlerFactory(patcher, actions);
    return handler;
};
var DEFAULT_OPTIONS = {
    middleware: [],
    patch: html_1.patch,
    plugins: [],
    root: "#app",
};
/**
 * Create and start a new application runtime
 *
 * The runner function takes a model, actions mapping, view function, and an
 * an object containing runner options, and kickstarts the app.
 */
var runner = function (model, actions, view, options) {
    if (options === void 0) { options = {}; }
    var opt = __assign({}, DEFAULT_OPTIONS, options);
    var state = {
        model: model,
        nextRenderId: null,
        vnodes: is.str(opt.root) ? document.querySelector(opt.root) : opt.root,
    };
    // Collect plugin actions
    opt.plugins.forEach(function (_a) {
        var pluginActions = _a.actions;
        actions = __assign({}, pluginActions, actions);
    });
    // Prepare the engine
    var middlewareStack = opt.middleware.reduce(function (m1, m2) {
        return function (fn) { return m1(m2(fn)); };
    }, function (fn) { return fn; });
    var render = createRenderer(state, opt.patch, view);
    var actionHandler = createActionHandler(state, actions, render, middlewareStack);
    var pluginActionHandler = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return actionHandler.apply(void 0, __spread(args))();
    };
    // Init plugins
    opt.plugins.forEach(function (_a) {
        var init = _a.init;
        init(pluginActionHandler, state);
    });
    // Start rendering
    render(actionHandler);
};
exports.runner = runner;
exports.default = runner;
//# sourceMappingURL=runner.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var createChannel = function () {
    return (function () {
        var listeners = [];
        return {
            addListener: function (fn) {
                listeners.push(fn);
            },
            removeListener: function (fn) {
                listeners = listeners.filter(function (f) { return f !== fn; });
            },
            send: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                listeners.forEach(function (fn) { return fn.apply(void 0, __spread(args)); });
            },
        };
    })();
};
exports.createChannel = createChannel;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var css = __webpack_require__(34);
var duckweed = __webpack_require__(0);
var devtool_1 = __webpack_require__(8);
var diff = __webpack_require__(37);
var scrubber = __webpack_require__(40);
var init = function () { return ({
    currentIndex: 0,
    diff: diff.init(),
    history: [],
    open: false,
    scrubber: scrubber.init(),
}); };
exports.init = init;
// Actions
var Action;
(function (Action) {
    Action["TogglePanel"] = "TogglePanel";
    Action["JumpToHistoryItem"] = "JumpToHistoryItem";
    Action["DiffAction"] = "DiffAction";
    Action["ScrubberAction"] = "ScrubberAction";
})(Action || (Action = {}));
exports.Action = Action;
var actions = (_a = {},
    _a[Action.TogglePanel] = function (patch) {
        patch(function (model) { return (__assign({}, model, { open: !model.open })); });
    },
    _a[Action.JumpToHistoryItem] = function (patch, index) {
        patch(function (model) {
            if (index === model.currentIndex) {
                return model;
            }
            devtool_1.host2client.send("injectState", model.history[index].after);
            return __assign({}, model, { currentIndex: index, diff: {
                    diff: model.history[index].diff,
                    scope: model.diff.scope,
                }, scrubber: __assign({}, model.scrubber, { pos: index / (model.history.length - 1) }) });
        });
    },
    _a[Action.DiffAction] = function (patch, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        (_a = diff.actions)[action].apply(_a, __spread([patch.as(["diff"])], args));
        var _a;
    },
    _a[Action.ScrubberAction] = function (patch, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        (_a = scrubber.actions)[action].apply(_a, __spread([patch.as(["scrubber"])], args));
        var _a;
    },
    _a);
exports.actions = actions;
var view = function (_a) {
    var model = _a.model, act = _a.act;
    return (duckweed.html("div", { class: css.__DUCKWEED_DEVTOOL__ },
        duckweed.html("button", { class: css.panelButton, "on-click": act([Action.TogglePanel]) }, model.open ? "▼" : "▲"),
        model.open
            ? (duckweed.html("div", { class: css.panelContents, style: {
                    delayed: {
                        transform: "translateY(0)",
                    },
                    remove: {
                        transform: "translateY(30vh)",
                    },
                    transform: "translateY(30vh)",
                    transition: "transform 0.2s",
                } },
                duckweed.html(scrubber.view, { model: model.scrubber, act: act.as(Action.ScrubberAction), jumpTo: act.as(Action.JumpToHistoryItem), current: model.currentIndex, length: model.history.length }),
                duckweed.html(diff.view, { model: model.diff, act: act.as(Action.DiffAction) })))
            : null));
};
exports.view = view;
var _a;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"sourceMap":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/stylus-loader/index.js!./index.styl", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/stylus-loader/index.js!./index.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * (c) 2017 Hajime Yamasaki Vukelic\n * All rights reserved.\n */\n.__DUCKWEED_DEVTOOL__-AIqBV {\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 16px;\n  line-height: 120%;\n}\n.__DUCKWEED_DEVTOOL__-AIqBV * {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 100%;\n  font-style: normal;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  text-decoration: none;\n}\n.panelButton-3KBNZ {\n  background: rgba(0,0,0,0.3);\n  border: none;\n  border-top-left-radius: 4px;\n  bottom: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 4px 10px;\n  position: fixed;\n  right: 0;\n  z-index: 5001;\n}\n.panelContents-1I8al {\n  background: rgba(255,255,255,0.8);\n  bottom: 0;\n  -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.3);\n          box-shadow: 0 0 10px rgba(0,0,0,0.3);\n  height: 30vh;\n  left: 0;\n  overflow: hidden;\n  padding: 1rem;\n  position: fixed;\n  right: 0;\n  -webkit-transition: all;\n  transition: all;\n  z-index: 5000;\n}\n", "", {"version":3,"sources":["C:/Code/duckweed-devtool/src/panel/C:/Code/duckweed-devtool/src/panel/index.styl","C:/Code/duckweed-devtool/src/panel/C:/Code/duckweed-devtool/index.styl"],"names":[],"mappings":"AAAA;;;GCGG;ADEH;EACE,0CAAA;EACA,gBAAA;EACA,kBAAA;CCAD;ADED;EACE,+BAAA;UAAA,uBAAA;EACA,gBAAA;EACA,mBAAA;EACA,iBAAA;EACA,UAAA;EACA,WAAA;EACA,sBAAA;CCAD;ADED;EACE,4BAAA;EACA,aAAA;EACA,4BAAA;EACA,UAAA;EACA,YAAA;EACA,gBAAA;EACA,kBAAA;EACA,gBAAA;EACA,SAAA;EACA,cAAA;CCAD;ADED;EACE,kCAAA;EACA,UAAA;EACA,6CAAA;UAAA,qCAAA;EACA,aAAA;EACA,QAAA;EACA,iBAAA;EACA,cAAA;EACA,gBAAA;EACA,SAAA;EACA,wBAAA;EAAA,gBAAA;EACA,cAAA;CCAD","file":"index.styl","sourcesContent":["/**\n * (c) 2017 Hajime Yamasaki Vukelic\n * All rights reserved.\n */\n\n.__DUCKWEED_DEVTOOL__\n  font-family Arial, Helvetica, sans-serif\n  font-size 16px\n  line-height 120%\n\n.__DUCKWEED_DEVTOOL__ *\n  box-sizing border-box\n  font-size 100%\n  font-style normal\n  list-style none\n  margin 0\n  padding 0\n  text-decoration none\n\n.panelButton\n  background rgba(0, 0, 0, 0.3)\n  border none\n  border-top-left-radius 4px\n  bottom 0\n  color white\n  cursor pointer\n  padding 4px 10px\n  position fixed\n  right 0\n  z-index 5001\n\n.panelContents\n  background transparentify(white, 0.8)\n  bottom 0\n  box-shadow 0 0 10px transparentify(black, 0.3)\n  height 30vh\n  left 0\n  overflow hidden\n  padding 1rem\n  position fixed\n  right 0\n  transition all\n  z-index 5000\n","/**\n * (c) 2017 Hajime Yamasaki Vukelic\n * All rights reserved.\n */\n.__DUCKWEED_DEVTOOL__ {\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 16px;\n  line-height: 120%;\n}\n.__DUCKWEED_DEVTOOL__ * {\n  box-sizing: border-box;\n  font-size: 100%;\n  font-style: normal;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  text-decoration: none;\n}\n.panelButton {\n  background: rgba(0,0,0,0.3);\n  border: none;\n  border-top-left-radius: 4px;\n  bottom: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 4px 10px;\n  position: fixed;\n  right: 0;\n  z-index: 5001;\n}\n.panelContents {\n  background: rgba(255,255,255,0.8);\n  bottom: 0;\n  box-shadow: 0 0 10px rgba(0,0,0,0.3);\n  height: 30vh;\n  left: 0;\n  overflow: hidden;\n  padding: 1rem;\n  position: fixed;\n  right: 0;\n  transition: all;\n  z-index: 5000;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"__DUCKWEED_DEVTOOL__": "__DUCKWEED_DEVTOOL__-AIqBV",
	"panelButton": "panelButton-3KBNZ",
	"panelContents": "panelContents-1I8al"
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var css = __webpack_require__(38);
var duckweed = __webpack_require__(0);
var diff_1 = __webpack_require__(9);
var is = __webpack_require__(10);
var init = function () { return ({
    diff: null,
    scope: [],
}); };
exports.init = init;
// Actions
var Action;
(function (Action) {
    Action["PushScope"] = "PushScope";
    Action["SetScope"] = "PopScope";
})(Action || (Action = {}));
exports.Action = Action;
var actions = (_a = {},
    _a[Action.PushScope] = function (patch, key) {
        patch(function (model) { return (__assign({}, model, { scope: model.scope.concat(key) })); });
    },
    _a[Action.SetScope] = function (patch, index) {
        patch(function (model) { return (__assign({}, model, { scope: index ? model.scope.slice(0, index + 1) : [] })); });
    },
    _a);
exports.actions = actions;
var scoped = function (scope, obj) {
    return typeof obj === "undefined" || scope.length === 0
        ? obj
        : scoped(scope.slice(1), obj[scope[0]]);
};
var isDiff = function (diff) {
    return diff instanceof diff_1.Diff;
};
var diffView = function (diff) { return (duckweed.html("span", { class: css[diff.type] }, diff.next)); };
var renderValue = function (act, k, v, extraClass) {
    if (extraClass === void 0) { extraClass = []; }
    if (is.container(v)) {
        return [
            duckweed.html("span", { class: [css.expandObject].concat(extraClass), "on-click": act(Action.PushScope, k) }, is.pojo(v) ? "{}" : "[]"),
            duckweed.html("span", { class: css.preview }, JSON.stringify(v)),
        ];
    }
    return duckweed.html("span", { class: extraClass }, "" + v);
};
var objDiff = function (act, obj) { return (duckweed.html("div", { class: css.obj }, Object.keys(obj).map(function (k) { return [k, obj[k]]; }).map(function (_a) {
    var _b = __read(_a, 2), k = _b[0], v = _b[1];
    return duckweed.html("div", { class: css.keyVal },
        duckweed.html("span", { class: css.key },
            k,
            ":"),
        duckweed.html("span", { class: css.val }, (function () {
            if (isDiff(v)) {
                if (v.type === "ident") {
                    return renderValue(act, k, v.next);
                }
                return renderValue(act, k, v.next, [css[v.type]]);
            }
            return renderValue(act, k, v);
        })()));
}))); };
var valueView = function (act, v) {
    if (isDiff(v)) {
        return diffView(v);
    }
    if (is.container(v)) {
        return objDiff(act, v);
    }
    return "" + v;
};
var view = function (_a) {
    var model = _a.model, act = _a.act;
    return (duckweed.html("div", { class: css.diffPane },
        duckweed.html("div", { class: css.breadcrumbs },
            duckweed.html("span", { class: css.crumb, "on-click": act(Action.SetScope, null) }, "(root)"),
            model.scope.map(function (key, index, keys) {
                return duckweed.html("span", { class: css.crumb, "on-click": act(Action.SetScope, index) }, key);
            })),
        duckweed.html("div", { class: css.inspector }, valueView(act, scoped(model.scope, model.diff)))));
};
exports.view = view;
var _a;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"sourceMap":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/stylus-loader/index.js!./diff.styl", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/stylus-loader/index.js!./diff.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * (c) 2017 Hajime Yamasaki Vukelic\n * All rights reserved.\n */\n.diffPane-3c7Xp {\n  padding: 1rem;\n}\n.breadcrumbs-1qPwy {\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 0.2rem;\n  padding-bottom: 0.2rem;\n}\n.crumb-3MmUj {\n  cursor: pointer;\n  display: inline-block;\n  font-family: monospace;\n  padding: 0.1rem 0.4rem;\n}\n.crumbhover-2hSLh {\n  text-decoration: underline;\n}\n.crumbpre-2Kps3 {\n  content: \".\";\n}\n.keyVal-3Mi7o {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-family: monospace;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.key-1pLcm {\n  display: inline-block;\n  width: 5rem;\n}\n.val-GtOkb {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  overflow: hidden;\n  width: 100%;\n}\n.expandObject-299w6 {\n  background: rgba(0,0,0,0.6);\n  border-radius: 3px;\n  color: #890;\n  cursor: pointer;\n  display: inline-block;\n  margin-right: 0.3rem;\n  padding: 0.1rem 0.2rem;\n}\n.expandObjecthover-3nQHt {\n  color: #fff;\n}\n.preview-2Vk7a {\n  display: inline-block;\n  opacity: 0.5;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 100%;\n}\n.ident-10V3I {\n  color: inherit;\n}\n.update-1H5I0 {\n  color: #5a26a8;\n}\n.add-2uWUU {\n  color: #83a826;\n}\n.del-3gc2h {\n  color: #a82626;\n  text-decoration: line-through;\n}\n", "", {"version":3,"sources":["C:/Code/duckweed-devtool/src/panel/C:/Code/duckweed-devtool/src/panel/diff.styl","C:/Code/duckweed-devtool/src/panel/C:/Code/duckweed-devtool/diff.styl"],"names":[],"mappings":"AAAA;;;GCGG;ADEH;EACE,cAAA;CCAD;ADED;EACE,8BAAA;EACA,sBAAA;EACA,uBAAA;CCAD;ADED;EACE,gBAAA;EACA,sBAAA;EACA,uBAAA;EACA,uBAAA;CCAD;ADEC;EACE,2BAAA;CCAH;ADEC;EACE,aAAA;CCAH;ADED;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,uBAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,+BAAA;CCAD;ADED;EACE,sBAAA;EACA,YAAA;CCAD;ADED;EACE,4BAAA;EAAA,4BAAA;EAAA,qBAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,+BAAA;EACA,iBAAA;EACA,YAAA;CCAD;ADED;EACE,4BAAA;EACA,mBAAA;EACA,YAAA;EACA,gBAAA;EACA,sBAAA;EACA,qBAAA;EACA,uBAAA;CCAD;ADEC;EACE,YAAA;CCAH;ADED;EACE,sBAAA;EACA,aAAA;EACA,iBAAA;EACA,wBAAA;EACA,oBAAA;EACA,YAAA;CCAD;ADED;EACE,eAAA;CCAD;ADED;EACE,eAAA;CCAD;ADED;EACE,eAAA;CCAD;ADED;EACE,eAAA;EACA,8BAAA;CCAD","file":"diff.styl","sourcesContent":["/**\n * (c) 2017 Hajime Yamasaki Vukelic\n * All rights reserved.\n */\n\n.diffPane\n  padding 1rem;\n\n.breadcrumbs\n  border-bottom 1px solid #ddd\n  margin-bottom 0.2rem\n  padding-bottom 0.2rem\n\n.crumb\n  cursor pointer\n  display inline-block\n  font-family monospace\n  padding 0.1rem 0.4rem\n\n  &hover\n    text-decoration underline\n\n  &pre\n    content \".\"\n\n.keyVal\n  display flex\n  font-family monospace\n  justify-content space-between\n\n.key\n  display inline-block\n  width 5rem\n\n.val\n  display inline-flex\n  justify-content space-between\n  overflow hidden\n  width 100%\n\n.expandObject\n  background transparentify(black, 0.6)\n  border-radius 3px\n  color #889900\n  cursor pointer\n  display inline-block\n  margin-right 0.3rem\n  padding 0.1rem 0.2rem\n\n  &hover\n    color white\n\n.preview\n  display inline-block\n  opacity 0.5\n  overflow hidden\n  text-overflow ellipsis\n  white-space nowrap\n  width 100%\n\n.ident\n  color inherit\n\n.update\n  color #5a26a8\n\n.add\n  color #83a826\n\n.del\n  color #a82626\n  text-decoration line-through\n","/**\n * (c) 2017 Hajime Yamasaki Vukelic\n * All rights reserved.\n */\n.diffPane {\n  padding: 1rem;\n}\n.breadcrumbs {\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 0.2rem;\n  padding-bottom: 0.2rem;\n}\n.crumb {\n  cursor: pointer;\n  display: inline-block;\n  font-family: monospace;\n  padding: 0.1rem 0.4rem;\n}\n.crumbhover {\n  text-decoration: underline;\n}\n.crumbpre {\n  content: \".\";\n}\n.keyVal {\n  display: flex;\n  font-family: monospace;\n  justify-content: space-between;\n}\n.key {\n  display: inline-block;\n  width: 5rem;\n}\n.val {\n  display: inline-flex;\n  justify-content: space-between;\n  overflow: hidden;\n  width: 100%;\n}\n.expandObject {\n  background: rgba(0,0,0,0.6);\n  border-radius: 3px;\n  color: #890;\n  cursor: pointer;\n  display: inline-block;\n  margin-right: 0.3rem;\n  padding: 0.1rem 0.2rem;\n}\n.expandObjecthover {\n  color: #fff;\n}\n.preview {\n  display: inline-block;\n  opacity: 0.5;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 100%;\n}\n.ident {\n  color: inherit;\n}\n.update {\n  color: #5a26a8;\n}\n.add {\n  color: #83a826;\n}\n.del {\n  color: #a82626;\n  text-decoration: line-through;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"diffPane": "diffPane-3c7Xp",
	"breadcrumbs": "breadcrumbs-1qPwy",
	"crumb": "crumb-3MmUj",
	"crumbhover": "crumbhover-2hSLh",
	"crumbpre": "crumbpre-2Kps3",
	"keyVal": "keyVal-3Mi7o",
	"key": "key-1pLcm",
	"val": "val-GtOkb",
	"expandObject": "expandObject-299w6",
	"expandObjecthover": "expandObjecthover-3nQHt",
	"preview": "preview-2Vk7a",
	"ident": "ident-10V3I",
	"update": "update-1H5I0",
	"add": "add-2uWUU",
	"del": "del-3gc2h"
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var css = __webpack_require__(41);
var duckweed = __webpack_require__(0);
var from = duckweed.events.from;
var init = function () { return ({
    barWidth: 0,
    dragging: false,
    initialMouse: 0,
    initialPos: 0,
    pos: 1,
}); };
exports.init = init;
// Actions
var Action;
(function (Action) {
    Action["Start"] = "Start";
    Action["End"] = "End";
    Action["Move"] = "Move";
})(Action || (Action = {}));
exports.Action = Action;
var restrict = function (min, max, val) {
    return Math.max(min, Math.min(max, val));
};
var actions = (_a = {},
    _a[Action.Start] = function (patch, x, w) {
        patch(function (model) { return (__assign({}, model, { barWidth: w, dragging: true, initialMouse: x, initialPos: model.pos })); });
    },
    _a[Action.Move] = function (patch, jumpTo, length, x) {
        patch(function (model) {
            var newPos = restrict(0, 1, model.initialPos + (x - model.initialMouse) / model.barWidth);
            var newIndex = Math.round(newPos * (length - 1));
            jumpTo(newIndex)();
            return __assign({}, model, { pos: newPos });
        });
    },
    _a[Action.End] = function (patch) {
        patch(function (model) { return (__assign({}, model, { dragging: false, initialMouse: 0, initialPos: 0 })); });
    },
    _a);
exports.actions = actions;
var cls = function (c, disabled) {
    return (_a = {},
        _a[css.button] = true,
        _a[c] = true,
        _a[css.disabled] = disabled,
        _a);
    var _a;
};
var mouseEvent = function (event) {
    return event.preventDefault() || [event.clientX];
};
var mouseEventW = function (event) {
    return event.preventDefault() || [
        event.clientX,
        event.target.parentNode.offsetWidth,
    ];
};
var view = function (_a) {
    var model = _a.model, act = _a.act, jumpTo = _a.jumpTo, current = _a.current, length = _a.length;
    var hasPrev = current > 0;
    var hasNext = current < length - 1;
    var jumpBack = hasPrev ? jumpTo(current - 1) : undefined;
    var jumpNext = hasNext ? jumpTo(current + 1) : undefined;
    return (duckweed.html("div", { class: css.scrubber },
        duckweed.html("div", { class: css.buttons },
            duckweed.html("button", { class: cls(css.prev, !hasPrev), "on-click": jumpBack }, "\u25C4"),
            " ",
            duckweed.html("button", { class: cls(css.next, !hasNext), "on-click": jumpNext }, "\u25BA")),
        duckweed.html("div", { class: css.progress },
            duckweed.html("div", { class: css.bar },
                duckweed.html("div", { class: css.handle, style: { left: model.pos * 100 + "%" }, "on-mousedown": from(mouseEventW, act(Action.Start)), "doc-mousemove": model.dragging ? from(mouseEvent, act(Action.Move, jumpTo, length)) : undefined, "doc-mouseup": model.dragging ? from(mouseEvent, act(Action.End)) : undefined }))),
        duckweed.html("div", { class: css.position },
            current + 1,
            " : ",
            length)));
};
exports.view = view;
var _a;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"sourceMap":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/stylus-loader/index.js!./scrubber.styl", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??ref--1-2!../../node_modules/stylus-loader/index.js!./scrubber.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * (c) 2017 Hajime Yamasaki Vukelic\n * All rights reserved.\n */\n.scrubber-2r-U7 {\n  -ms-flex-line-pack: center;\n      align-content: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 2rem;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.buttons-2B9Xe {\n  display: inline-block;\n  height: 2rem;\n  text-align: center;\n  vertical-align: middle;\n  white-space: nowrap;\n  width: 7rem;\n}\n.button-3vhP7 {\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-size: 160%;\n  padding: 0.2rem;\n}\n.disabled-PsXyv {\n  opacity: 0.2;\n}\n.progress-1HUr4 {\n  display: inline-block;\n  height: 31px;\n  position: relative;\n  vertical-align: middle;\n  width: 100%;\n}\n.bar-25eEA {\n  background: #444;\n  border-radius: 1px;\n  height: 3px;\n  left: 15px;\n  position: absolute;\n  right: 15px;\n  top: 15px;\n}\n.handle-31lRL {\n  background: #777;\n  border: 1px solid #ddd;\n  border-radius: 16px;\n  -webkit-box-shadow: 0 2px 5px rgba(0,0,0,0.3);\n          box-shadow: 0 2px 5px rgba(0,0,0,0.3);\n  height: 31px;\n  position: absolute;\n  top: -15px;\n  -webkit-transform: translateX(-16px);\n          transform: translateX(-16px);\n  -webkit-transition: all 0.2s;\n  transition: all 0.2s;\n  width: 31px;\n}\n.position-FXvCR {\n  display: inline-block;\n  font-family: monospace;\n  font-size: 90%;\n  line-height: 2rem;\n  padding: 0 0.5rem;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n", "", {"version":3,"sources":["C:/Code/duckweed-devtool/src/panel/C:/Code/duckweed-devtool/src/panel/scrubber.styl","C:/Code/duckweed-devtool/src/panel/C:/Code/duckweed-devtool/scrubber.styl"],"names":[],"mappings":"AAAA;;;GCGG;ADEH;EACE,2BAAA;MAAA,sBAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,aAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,+BAAA;CCAD;ADED;EACE,sBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,oBAAA;EACA,YAAA;CCAD;ADED;EACE,wBAAA;EACA,UAAA;EACA,gBAAA;EACA,gBAAA;EACA,gBAAA;CCAD;ADED;EACE,aAAA;CCAD;ADED;EACE,sBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;CCAD;ADED;EACE,iBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,mBAAA;EACA,YAAA;EACA,UAAA;CCAD;ADED;EACE,iBAAA;EACA,uBAAA;EACA,oBAAA;EACA,8CAAA;UAAA,sCAAA;EACA,aAAA;EACA,mBAAA;EACA,WAAA;EACA,qCAAA;UAAA,6BAAA;EACA,6BAAA;EAAA,qBAAA;EACA,YAAA;CCAD;ADED;EACE,sBAAA;EACA,uBAAA;EACA,eAAA;EACA,kBAAA;EACA,kBAAA;EACA,uBAAA;EACA,oBAAA;CCAD","file":"scrubber.styl","sourcesContent":["/**\n * (c) 2017 Hajime Yamasaki Vukelic\n * All rights reserved.\n */\n\n.scrubber\n  align-content center\n  display flex\n  height 2rem\n  justify-content space-between\n\n.buttons\n  display inline-block\n  height 2rem\n  text-align center\n  vertical-align middle\n  white-space nowrap\n  width 7rem\n\n.button\n  background transparent\n  border 0\n  cursor pointer\n  font-size 160%\n  padding 0.2rem\n\n.disabled\n  opacity 0.2;\n\n.progress\n  display inline-block\n  height 31px\n  position relative\n  vertical-align middle\n  width 100%\n\n.bar\n  background #444444\n  border-radius 1px\n  height 3px\n  left 15px\n  position absolute\n  right 15px\n  top 15px\n\n.handle\n  background #777777\n  border 1px solid #dddddd\n  border-radius 16px\n  box-shadow 0 2px 5px transparentify(black, 0.3)\n  height 31px\n  position absolute\n  top -15px\n  transform translateX(-16px)\n  transition all 0.2s\n  width 31px\n\n.position\n  display inline-block\n  font-family monospace\n  font-size 90%\n  line-height 2rem\n  padding 0 0.5rem\n  vertical-align middle\n  white-space nowrap\n","/**\n * (c) 2017 Hajime Yamasaki Vukelic\n * All rights reserved.\n */\n.scrubber {\n  align-content: center;\n  display: flex;\n  height: 2rem;\n  justify-content: space-between;\n}\n.buttons {\n  display: inline-block;\n  height: 2rem;\n  text-align: center;\n  vertical-align: middle;\n  white-space: nowrap;\n  width: 7rem;\n}\n.button {\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  font-size: 160%;\n  padding: 0.2rem;\n}\n.disabled {\n  opacity: 0.2;\n}\n.progress {\n  display: inline-block;\n  height: 31px;\n  position: relative;\n  vertical-align: middle;\n  width: 100%;\n}\n.bar {\n  background: #444;\n  border-radius: 1px;\n  height: 3px;\n  left: 15px;\n  position: absolute;\n  right: 15px;\n  top: 15px;\n}\n.handle {\n  background: #777;\n  border: 1px solid #ddd;\n  border-radius: 16px;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.3);\n  height: 31px;\n  position: absolute;\n  top: -15px;\n  transform: translateX(-16px);\n  transition: all 0.2s;\n  width: 31px;\n}\n.position {\n  display: inline-block;\n  font-family: monospace;\n  font-size: 90%;\n  line-height: 2rem;\n  padding: 0 0.5rem;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"scrubber": "scrubber-2r-U7",
	"buttons": "buttons-2B9Xe",
	"button": "button-3vhP7",
	"disabled": "disabled-PsXyv",
	"progress": "progress-1HUr4",
	"bar": "bar-25eEA",
	"handle": "handle-31lRL",
	"position": "position-FXvCR"
};

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map