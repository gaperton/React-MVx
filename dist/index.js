(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("type-r"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["type-r", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactMVC"] = factory(require("type-r"), require("react"));
	else
		root["ReactMVC"] = factory(root["Nested"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony export (immutable) */ __webpack_exports__["c"] = collectSpecs;
/* harmony export (immutable) */ __webpack_exports__["d"] = compileSpecs;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Element; });


function collectSpecs(spec, name) {
    var attributes = null;
    // Scan through local mixin, and gather specs. Refactor it later, it's not good. At all.
    for (var i = spec.mixins.length - 1; i >= 0; i--) {
        var mixin = spec.mixins[i], mixinAttrs = mixin[name];
        if (mixinAttrs) {
            attributes || (attributes = {});
            __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].assign(attributes, mixinAttrs);
        }
    }
    // Merge it with local data.
    var specAttrs = spec[name];
    if (specAttrs) {
        if (attributes) {
            __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].assign(attributes, specAttrs);
        }
        else {
            attributes = specAttrs;
        }
    }
    return attributes;
}
function compileSpecs(props) {
    var propTypes = {}, 
    // Create NestedTypes model definition to process props spec.
    modelProto = __WEBPACK_IMPORTED_MODULE_1_type_r__["Record"].defaults(props).prototype;
    var defaults, watchers, changeHandlers;
    modelProto.forEachAttr(modelProto._attributes, function (spec, name) {
        // Skip auto-generated `id` attribute.
        if (name !== 'id') {
            var value = spec.value, type = spec.type, options = spec.options;
            // Translate props type to the propTypes guard.
            propTypes[name] = translateType(type, options.isRequired);
            if (options._onChange) {
                watchers || (watchers = {});
                watchers[name] = toLocalWatcher(options._onChange);
            }
            // Handle listening to event maps...
            if (options.changeHandlers) {
                changeHandlers || (changeHandlers = {});
                changeHandlers[name] = options.changeHandlers;
            }
            // Handle listening to props changes...
            if (options.changeEvents) {
                changeHandlers || (changeHandlers = {});
                var handlers = changeHandlers[name] || (changeHandlers[name] = []), changeEvents_1 = options.changeEvents === 'string' ? options.changeEvents : null;
                handlers.push(function (prev, next, component) {
                    prev && component.stopListening(prev);
                    next && component.listenTo(next, changeEvents_1 || next._changeEventName, component.asyncUpdate);
                });
            }
            // If default value is explicitly provided...
            if (value !== void 0) {
                //...append it to getDefaultProps function.
                defaults || (defaults = {});
                defaults[name] = spec.convert(value);
            }
        }
    });
    return { propTypes: propTypes, defaults: defaults, watchers: watchers, changeHandlers: changeHandlers };
}
function toLocalWatcher(ref) {
    return typeof ref === 'function' ? ref : function (value, name) {
        this[ref] && this[ref](value, name);
    };
}
var Node = (function () {
    function Node() {
    }
    return Node;
}());

var Element = (function () {
    function Element() {
    }
    return Element;
}());

function translateType(Type, isRequired) {
    var T = _translateType(Type);
    return isRequired ? T.isRequired : T;
}
function _translateType(Type) {
    switch (Type) {
        case Number:
        case Number.integer:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number;
        case String:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string;
        case Boolean:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool;
        case Array:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].array;
        case Function:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func;
        case Object:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object;
        case Node:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].node;
        case Element:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].element;
        case void 0:
        case null:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].any;
        default:
            return __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].instanceOf(Type);
    }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony export (immutable) */ __webpack_exports__["a"] = process;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return StateMixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UpdateOnNestedChangesMixin; });
/*****************
 * State
 */


function process(spec, baseProto) {
    // process state spec...
    var attributes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'state');
    if (attributes || baseProto.State) {
        var BaseModel = baseProto.State || __WEBPACK_IMPORTED_MODULE_1_type_r__["Record"];
        spec.State = attributes ? (typeof attributes === 'function' ? attributes : BaseModel.defaults(attributes)) : BaseModel;
        spec.mixins.push(StateMixin);
        spec.mixins.push(UpdateOnNestedChangesMixin);
        delete spec.state;
        delete spec.attributes;
    }
}
var StateMixin = {
    state: null,
    componentWillMount: function () {
        var state = this.state = new this.State();
        // Take ownership on state...
        state._owner = this;
        state._ownerKey = 'state';
    },
    context: {
        _nestedStore: __WEBPACK_IMPORTED_MODULE_1_type_r__["Store"]
    },
    // reference global store to fix model's store locator
    getStore: function () {
        // Attempt to get the store from the context first. Then - fallback to the state's default store.
        // TBD: Need to figure out a good way of managing local stores.
        var context, state;
        return ((context = this.context) && context._archetypeStore) ||
            ((state = this.state) && state._defaultStore);
    },
    componentWillUnmount: function () {
        var state = this.state;
        state._owner = state._ownerKey = void 0;
        state.dispose();
        this.state = void 0;
    }
};
var UpdateOnNestedChangesMixin = {
    _onChildrenChange: function () { },
    componentDidMount: function () {
        this._onChildrenChange = this.asyncUpdate;
    }
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NestedLink_valuelink__ = __webpack_require__(6);
/**
 * Import ValueLink library
 * Define value links binding mixins to the Record and Collection
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__NestedLink_valuelink__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_type_r__["Mixable"].mixTo(__WEBPACK_IMPORTED_MODULE_1__NestedLink_valuelink__["a" /* default */]);
/**
 * Record
 */
__WEBPACK_IMPORTED_MODULE_0_type_r__["Record"].mixins({
    // Link to the record's attribute by its key.
    getLink: function (key) {
        return cacheLink(getLinksCache(this), this, key);
    },
    // Link to the attribute of the record's tree by symbolic path.
    deepLink: function (path, options) {
        return new RecordDeepLink(this, path, options);
    },
    // Link all (or listed) attributes and return links cache.
    linkAll: function () {
        var links = getLinksCache(this);
        if (arguments.length) {
            for (var i = 0; i < arguments.length; i++) {
                cacheLink(links, this, arguments[i]);
            }
        }
        else {
            var attributes = this.attributes;
            for (var key in attributes) {
                attributes[key] === void 0 || cacheLink(links, this, key);
            }
        }
        return links;
    }
});
/**
 * Link to Type-R's record attribute.
 * Strict evaluation of value, lazy evaluation of validation error.
 * Links are cached in the records
 */
var RecordLink = (function (_super) {
    __extends(RecordLink, _super);
    function RecordLink(record, attr, value) {
        var _this = _super.call(this, value) || this;
        _this.record = record;
        _this.attr = attr;
        return _this;
    }
    RecordLink.prototype.set = function (x) {
        this.record[this.attr] = x;
    };
    Object.defineProperty(RecordLink.prototype, "error", {
        get: function () {
            return this._error === void 0 ?
                this.record.getValidationError(this.attr) :
                this._error;
        },
        set: function (x) {
            this._error = x;
        },
        enumerable: true,
        configurable: true
    });
    return RecordLink;
}(__WEBPACK_IMPORTED_MODULE_1__NestedLink_valuelink__["a" /* default */]));
var RecordDeepLink = (function (_super) {
    __extends(RecordDeepLink, _super);
    function RecordDeepLink(record, path, options) {
        var _this = _super.call(this, record.deepGet(path)) || this;
        _this.record = record;
        _this.path = path;
        _this.options = options;
        return _this;
    }
    Object.defineProperty(RecordDeepLink.prototype, "error", {
        get: function () {
            if (this._error === void 0) {
                this._error = this.record.deepValidationError(this.path) || null;
            }
            return this._error;
        },
        set: function (x) {
            this._error = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordDeepLink.prototype, "_changeToken", {
        get: function () {
            return this.record._changeToken;
        },
        enumerable: true,
        configurable: true
    });
    RecordDeepLink.prototype.set = function (x) {
        this.record.deepSet(this.path, x, this.options);
    };
    return RecordDeepLink;
}(__WEBPACK_IMPORTED_MODULE_1__NestedLink_valuelink__["a" /* default */]));
function getLinksCache(record) {
    return record._links || (record._links = new record.Attributes({}));
}
function cacheLink(links, record, key) {
    var cached = links[key], value = record[key];
    return cached && cached.value === value ? cached
        : links[key] = new RecordLink(record, key, value);
}
/***********************************
 * Collection
 */
__WEBPACK_IMPORTED_MODULE_0_type_r__["Record"].Collection.mixins({
    // Boolean link to the record's presence in the collection
    hasLink: function (record) {
        return new CollectionLink(this, record);
    },
    // Link to collection's property
    getLink: function (prop) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1__NestedLink_valuelink__["a" /* default */].value(this[prop], function (x) { return _this[prop] = x; });
    }
});
/**
 * Boolean link to presence of NestedType's record in collection.
 * Strict evaluation of value, no error.
 * Safe implementation of _changeToken.
 */
var CollectionLink = (function (_super) {
    __extends(CollectionLink, _super);
    function CollectionLink(collection, record) {
        var _this = _super.call(this, Boolean(collection._byId[record.cid])) || this;
        _this.collection = collection;
        _this.record = record;
        return _this;
    }
    CollectionLink.prototype.set = function (x) {
        this.collection.toggle(this.record, x);
    };
    return CollectionLink;
}(__WEBPACK_IMPORTED_MODULE_1__NestedLink_valuelink__["a" /* default */]));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__props__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__typeSpecs__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__typeSpecs__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__typeSpecs__["b"]; });
/* harmony export (immutable) */ __webpack_exports__["c"] = process;





function process(spec, baseProto) {
    if (baseProto === void 0) { baseProto = {}; }
    // Initialize mixins placeholder...
    spec.mixins || (spec.mixins = []);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */])(spec, baseProto);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */])(spec, baseProto);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__context__["a" /* default */])(spec, baseProto);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__props__["a" /* default */])(spec, baseProto);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common__["a" /* default */])(spec, baseProto);
    return spec;
}
;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CustomLink */
/* unused harmony export CloneLink */
/* unused harmony export StateLink */
/* unused harmony export EqualsLink */
/* unused harmony export EnabledLink */
/* unused harmony export ContainsLink */
/* unused harmony export ChainedLink */
/**
 * Advanced React links for purely functional two-way data binding
 *
 * MIT License, (c) 2016 Vlad Balin, Volicon.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Main Link class. All links must extend it.
var Link = (function () {
    // create 
    function Link(value) {
        this.value = value;
    }
    // Create link to componen't state
    Link.state = function (component, key) {
        var value = component.state[key], cache = component.links || (component.links = {}), cached = cache[key];
        return cached && cached.value === value ? cached : cache[key] = new StateLink(value, component, key);
    };
    ;
    // Ensure that listed links are cached. Return links cache.
    Link.all = function (component) {
        var state = component.state, links = component.links || (component.links = {});
        for (var i = 1; i < arguments.length; i++) {
            var key = arguments[i], value = state[key], cached = links[key];
            if (!cached || cached.value !== value) {
                links[key] = new StateLink(value, component, key);
            }
        }
        return links;
    };
    // Create custom link to arbitrary value
    Link.value = function (value, set) {
        return new CustomLink(value, set);
    };
    Object.defineProperty(Link.prototype, "validationError", {
        // DEPRECATED: Old error holder for backward compatibility with Volicon code base
        get: function () { return this.error; },
        enumerable: true,
        configurable: true
    });
    Link.prototype.onChange = function (handler) {
        var _this = this;
        return new CloneLink(this, function (x) {
            handler(x);
            _this.set(x);
        });
    };
    // DEPRECATED: Old React method for backward compatibility
    Link.prototype.requestChange = function (x) {
        this.set(x);
    };
    // Immediately update the link value using given transform function.
    Link.prototype.update = function (transform, e) {
        var next = transform(this.clone(), e);
        next === void 0 || this.set(next);
    };
    // Create new link which applies transform function on set.
    Link.prototype.pipe = function (handler) {
        var _this = this;
        return new CloneLink(this, function (x) {
            var next = handler(x, _this.value);
            next === void 0 || _this.set(next);
        });
    };
    // Create UI event handler function which will update the link with a given transform function.
    Link.prototype.action = function (transform) {
        var _this = this;
        return function (e) { return _this.update(transform, e); };
    };
    Link.prototype.equals = function (truthyValue) {
        return new EqualsLink(this, truthyValue);
    };
    Link.prototype.enabled = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = ''; }
        return new EnabledLink(this, defaultValue);
    };
    // Array-only links methods
    Link.prototype.contains = function (element) {
        return new ContainsLink(this, element);
    };
    Link.prototype.push = function () {
        var array = arrayHelpers.clone(this.value);
        Array.prototype.push.apply(array, arguments);
        this.set(array);
    };
    Link.prototype.unshift = function () {
        var array = arrayHelpers.clone(this.value);
        Array.prototype.unshift.apply(array, arguments);
        this.set(array);
    };
    Link.prototype.splice = function () {
        var array = arrayHelpers.clone(this.value);
        Array.prototype.splice.apply(array, arguments);
        this.set(array);
    };
    // Array and objects universal collection methods
    Link.prototype.map = function (iterator) {
        return helpers(this.value).map(this, iterator);
    };
    Link.prototype.remove = function (key) {
        var value = this.value, _ = helpers(value);
        this.set(_.remove(_.clone(value), key));
    };
    Link.prototype.at = function (key) {
        return new ChainedLink(this, key);
    };
    Link.prototype.clone = function () {
        var value = this.value;
        return helpers(value).clone(value);
    };
    Link.prototype.pick = function () {
        var links = {};
        for (var i = 0; i < arguments.length; i++) {
            var key = arguments[i];
            links[key] = new ChainedLink(this, key);
        }
        return links;
    };
    /**
     * Validate link with validness predicate and optional custom error object. Can be chained.
     */
    Link.prototype.check = function (whenValid, error) {
        if (!this.error && !whenValid(this.value)) {
            this.error = error || whenValid.error || defaultError;
        }
        return this;
    };
    return Link;
}());
/* harmony default export */ __webpack_exports__["a"] = (Link);
var CustomLink = (function (_super) {
    __extends(CustomLink, _super);
    function CustomLink(value, set) {
        var _this = _super.call(this, value) || this;
        _this.set = set;
        return _this;
    }
    CustomLink.prototype.set = function (x) { };
    return CustomLink;
}(Link));

var CloneLink = (function (_super) {
    __extends(CloneLink, _super);
    function CloneLink(parent, set) {
        var _this = _super.call(this, parent.value) || this;
        _this.set = set;
        var error = parent.error;
        if (error)
            _this.error = error;
        return _this;
    }
    CloneLink.prototype.set = function (x) { };
    return CloneLink;
}(Link));

var StateLink = (function (_super) {
    __extends(StateLink, _super);
    function StateLink(value, component, key) {
        var _this = _super.call(this, value) || this;
        _this.component = component;
        _this.key = key;
        return _this;
    }
    StateLink.prototype.set = function (x) {
        this.component.setState((_a = {}, _a[this.key] = x, _a));
        var _a;
    };
    return StateLink;
}(Link));

var EqualsLink = (function (_super) {
    __extends(EqualsLink, _super);
    function EqualsLink(parent, truthyValue) {
        var _this = _super.call(this, parent.value === truthyValue) || this;
        _this.parent = parent;
        _this.truthyValue = truthyValue;
        return _this;
    }
    EqualsLink.prototype.set = function (x) {
        this.parent.set(x ? this.truthyValue : null);
    };
    return EqualsLink;
}(Link));

var EnabledLink = (function (_super) {
    __extends(EnabledLink, _super);
    function EnabledLink(parent, defaultValue) {
        var _this = _super.call(this, parent.value != null) || this;
        _this.parent = parent;
        _this.defaultValue = defaultValue;
        return _this;
    }
    EnabledLink.prototype.set = function (x) {
        this.parent.set(x ? this.defaultValue : null);
    };
    return EnabledLink;
}(Link));

var ContainsLink = (function (_super) {
    __extends(ContainsLink, _super);
    function ContainsLink(parent, element) {
        var _this = _super.call(this, parent.value.indexOf(element) >= 0) || this;
        _this.parent = parent;
        _this.element = element;
        return _this;
    }
    ContainsLink.prototype.set = function (x) {
        var _this = this;
        var next = Boolean(x);
        if (this.value !== next) {
            var arr = this.parent.value, nextValue = x ? arr.concat(this.element) : arr.filter(function (el) { return el !== _this.element; });
            this.parent.set(nextValue);
        }
    };
    return ContainsLink;
}(Link));

var defaultError = 'Invalid value';
/**
 * Link to array or object element enclosed in parent link.
 * Performs purely functional update of the parent, shallow copying its value on `set`.
 */
var ChainedLink = (function (_super) {
    __extends(ChainedLink, _super);
    function ChainedLink(parent, key) {
        var _this = _super.call(this, parent.value[key]) || this;
        _this.parent = parent;
        _this.key = key;
        return _this;
    }
    ChainedLink.prototype.remove = function (key) {
        if (key === void 0) {
            this.parent.remove(this.key);
        }
        else {
            _super.prototype.remove.call(this, key);
        }
    };
    // Set new element value to parent array or object, performing purely functional update.
    ChainedLink.prototype.set = function (x) {
        var _this = this;
        if (this.value !== x) {
            this.parent.update(function (value) {
                value[_this.key] = x;
                return value;
            });
        }
    };
    ;
    return ChainedLink;
}(Link));

var ArrayProto = Array.prototype, ObjectProto = Object.prototype;
function helpers(value) {
    if (value && typeof value === 'object') {
        switch (Object.getPrototypeOf(value)) {
            case ArrayProto: return arrayHelpers;
            case ObjectProto: return objectHelpers;
        }
    }
    return dummyHelpers;
}
// Do nothing for types other than Array and plain Object.
var dummyHelpers = {
    clone: function (value) { return value; },
    map: function (link, fun) { return []; },
    remove: function (value) { return value; }
};
// `map` and `clone` for plain JS objects
var objectHelpers = {
    // Map through the link to object
    map: function (link, iterator) {
        var hash = link.value;
        var mapped = [];
        for (var key in hash) {
            var element = iterator(link.at(key), key);
            element === void 0 || (mapped.push(element));
        }
        return mapped;
    },
    remove: function (object, key) {
        delete object[key];
        return object;
    },
    // Shallow clone plain JS object
    clone: function (object) {
        var cloned = {};
        for (var key in object) {
            cloned[key] = object[key];
        }
        return cloned;
    }
};
// `map` and `clone` helpers for arrays.
var arrayHelpers = {
    // Shallow clone array
    clone: function (array) {
        return array.slice();
    },
    remove: function (array, i) {
        array.splice(i, 1);
        return array;
    },
    // Map through the link to array
    map: function (link, iterator) {
        var mapped = [], array = link.value;
        for (var i = 0; i < array.length; i++) {
            var y = iterator(link.at(i), i);
            y === void 0 || (mapped.push(y));
        }
        return mapped;
    }
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_type_r__);
/* harmony export (immutable) */ __webpack_exports__["a"] = compile;
/* unused harmony export asyncUpdate */
/**
 * Process `autobind` specs, attach async event processing and transactional support.
 */

function compile(spec, _a) {
    var _b = _a._autobind, _autobind = _b === void 0 ? [] : _b;
    // Attach autobind mixin...
    if (spec.autobind) {
        spec._autobind = spec.autobind.split(/\s+/).concat(_autobind);
        spec.mixins.push(AutobindMixin);
        delete spec.autobind;
    }
    // Attach common mixin
    spec.mixins.push(CommonMixin);
}
/***
 * Autobinding
 */
var AutobindMixin = {
    componentWillMount: function () {
        for (var _i = 0, _a = this._autobind; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            this[name_1] = this[name_1].bind(this);
        }
    }
};
function asyncUpdate() {
    this.shouldComponentUpdate === returnFalse || this._disposed || this.forceUpdate();
}
function returnFalse() { return false; }
/**
 * Mixin which is attached to all components.
 */
var CommonMixin = __WEBPACK_IMPORTED_MODULE_0_type_r__["tools"].assign({
    componentWillUnmount: function () {
        // Prevent memory leaks when working with events.
        this.off();
        this.stopListening();
        // Mark component as disposed.
        this._disposed = true;
    },
    // Safe version of the forceUpdate suitable for asynchronous callbacks.
    asyncUpdate: asyncUpdate,
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    transaction: function (fun) {
        var shouldComponentUpdate = this.shouldComponentUpdate, isRoot = shouldComponentUpdate !== returnFalse;
        if (isRoot) {
            this.shouldComponentUpdate = returnFalse;
        }
        fun(this.props, this.state);
        if (isRoot) {
            this.shouldComponentUpdate = shouldComponentUpdate;
            this.asyncUpdate();
        }
    }
}, __WEBPACK_IMPORTED_MODULE_0_type_r__["Events"]);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = process;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

function process(spec, _a) {
    var _b = _a._context, _context = _b === void 0 ? {} : _b, _c = _a._childContext, _childContext = _c === void 0 ? {} : _c;
    // process context specs...
    var context = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'context');
    if (context) {
        spec._context = __assign({}, _context, context);
        spec.contextTypes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["d" /* compileSpecs */])(context).propTypes;
        delete spec.context;
    }
    // and child context specs...
    var childContext = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'childContext');
    if (childContext) {
        spec._childContext = __assign({}, _childContext, childContext);
        spec.childContextTypes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["d" /* compileSpecs */])(childContext).propTypes;
        delete spec.childContext;
    }
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pureRender__ = __webpack_require__(10);
/* harmony export (immutable) */ __webpack_exports__["a"] = process;
/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


function process(spec, _a) {
    var pureRender = _a.pureRender, _b = _a._props, _props = _b === void 0 ? {} : _b, _c = _a._listenToPropsArray, _listenToPropsArray = _c === void 0 ? [] : _c, _d = _a._listenToPropsHash, _listenToPropsHash = _d === void 0 ? {} : _d;
    // process props spec...
    var props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'props');
    if (props) {
        var allProps = spec._props = __assign({}, _props, props);
        var _e = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["d" /* compileSpecs */])(allProps), propTypes = _e.propTypes, defaults_1 = _e.defaults, watchers = _e.watchers, changeHandlers = _e.changeHandlers;
        spec.propTypes = propTypes;
        if (defaults_1)
            spec.getDefaultProps = function () { return defaults_1; };
        if (watchers) {
            spec.mixins.unshift(WatchersMixin);
            spec._watchers = watchers;
        }
        if (changeHandlers) {
            spec.mixins.unshift(ChangeHandlersMixin);
            spec._changeHandlers = changeHandlers;
        }
        delete spec.props;
    }
    // compile pure render mixin
    if (spec._props && (spec.pureRender || pureRender)) {
        spec.mixins.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__pureRender__["a" /* default */])(spec._props));
    }
}
/**
 * ChangeHandlers are fired in sequence upon props replacement.
 * Fires _after_ UI is updated. Used for managing events subscriptions.
 */
var ChangeHandlersMixin = {
    componentDidMount: handleChanges,
    componentDidUpdate: handleChanges
};
function handleChanges(prev) {
    if (prev === void 0) { prev = {}; }
    var _a = this, _changeHandlers = _a._changeHandlers, props = _a.props;
    for (var name_1 in _changeHandlers) {
        if (prev[name_1] !== props[name_1]) {
            for (var _i = 0, _b = _changeHandlers[name_1]; _i < _b.length; _i++) {
                var handler = _b[_i];
                handler(props[name_1], prev[name_1], this);
            }
        }
    }
}
/**
 * Watchers works on props replacement and fires _before_ any change will be applied and UI is updated.
 * Fired in componentWillMount as well, which makes it a nice way to sync state from props.
 */
var WatchersMixin = {
    componentWillReceiveProps: function (next) {
        var _a = this, _watchers = _a._watchers, props = _a.props;
        for (var name_2 in _watchers) {
            if (next[name_2] !== props[name_2]) {
                _watchers[name_2].call(this, next[name_2], name_2);
            }
        }
    },
    componentWillMount: function () {
        var _a = this, _watchers = _a._watchers, props = _a.props;
        for (var name_3 in _watchers) {
            _watchers[name_3].call(this, props[name_3], name_3);
        }
    }
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createPureRenderMixin;
function createPureRenderMixin(props) {
    var ctorBody = ['var v; this._s = s && s._changeToken'], isChangedBody = ['var v; return ( s && s._changeToken !== t._s )'];
    for (var name_1 in props) {
        var propExpr = "( ( v = p." + name_1 + ") && v._changeToken ) || v";
        ctorBody.push("this." + name_1 + "= " + propExpr);
        isChangedBody.push("t." + name_1 + " !== (" + propExpr + ")");
    }
    var ChangeTokens = new Function('p', 's', ctorBody.join(';')), isChanged = new Function('t', 'p', 's', isChangedBody.join('||'));
    ChangeTokens.prototype = null;
    return {
        _changeTokens: null,
        shouldComponentUpdate: function (nextProps) {
            return isChanged(this._changeTokens, nextProps, this.state);
        },
        componentDidMount: function () {
            this._changeTokens = new ChangeTokens(this.props, this.state);
        },
        componentDidUpdate: function () {
            this._changeTokens = new ChangeTokens(this.props, this.state);
        }
    };
}
;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["a"] = process;



function process(spec, baseProto) {
    var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'store');
    if (store) {
        delete spec.store;
        if (store instanceof __WEBPACK_IMPORTED_MODULE_1_type_r__["Store"]) {
            // Direct reference to an existing store. Put it to the prototype.
            spec.store = store;
            spec.mixins.push(ExternalStoreMixin);
        }
        else {
            spec.Store = store;
            spec.mixins.push(InternalStoreMixin);
            spec.mixins.push(__WEBPACK_IMPORTED_MODULE_2__state__["b" /* UpdateOnNestedChangesMixin */]);
        }
        spec.mixins.push(ExposeStoreMixin);
    }
}
/**
 * Attached whenever the store declaration of any form is present in the component.
 */
var ExposeStoreMixin = {
    childContext: {
        _nestedStore: __WEBPACK_IMPORTED_MODULE_1_type_r__["Store"]
    },
    getChildContext: function () {
        return { _nestedStore: this.store };
    },
    getStore: function () {
        return this.store;
    },
    // Will be called by the store when the lookup will fail.
    get: function (key) {
        // Ask upper store.
        var store = __WEBPACK_IMPORTED_MODULE_2__state__["c" /* StateMixin */].getStore.call(this, key);
        return store && store.get(key);
    }
};
/**
 * External store must just track the changes and trigger render.
 * TBD: don't use it yet.
 */
var ExternalStoreMixin = {
    componentDidMount: function () {
        // Start UI updates on state changes.
        this.listenTo(this.store, 'change', this.asyncUpdate);
    }
};
var InternalStoreMixin = {
    componentWillMount: function () {
        var store = this.store = new this.Store();
        store._owner = this;
        store._ownerKey = 'store';
    },
    componentWillUnmount: function () {
        this.store._ownerKey = this.store._owner = void 0;
        this.store.dispose();
        this.store = void 0;
    }
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__define__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};




// extend React namespace
var ReactMVx = Object.create(__WEBPACK_IMPORTED_MODULE_0_react__);
// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
/* harmony default export */ __webpack_exports__["default"] = (ReactMVx);
// listenToProps, listenToState, model, attributes, Model
ReactMVx.createClass = createClass;
ReactMVx.define = __WEBPACK_IMPORTED_MODULE_1_type_r__["define"];
ReactMVx.mixins = __WEBPACK_IMPORTED_MODULE_1_type_r__["mixins"];
ReactMVx.Node = __WEBPACK_IMPORTED_MODULE_2__define__["a" /* Node */].value(null);
ReactMVx.Element = __WEBPACK_IMPORTED_MODULE_2__define__["b" /* Element */].value(null);
ReactMVx.Link = __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */];
var reactMixinRules = {
    componentWillMount: 'reverse',
    componentDidMount: 'reverse',
    componentWillReceiveProps: 'reverse',
    shouldComponentUpdate: 'some',
    componentWillUpdate: 'reverse',
    componentDidUpdate: 'reverse',
    componentWillUnmount: 'sequence',
    state: 'merge',
    store: 'merge',
    props: 'merge',
    context: 'merge',
    childContext: 'merge',
    getChildContext: 'mergeSequence'
};
function createClass(a_spec) {
    var _a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__define__["c" /* default */])(a_spec), _b = _a.mixins, mixins = _b === void 0 ? [] : _b, spec = __rest(_a, ["mixins"]);
    // We have the reversed sequence for the majority of the lifecycle hooks.
    // So, mixins lifecycle methods works first. It's important.
    // To make it consistent with class mixins implementation, we override React mixins.
    for (var _i = 0, mixins_1 = mixins; _i < mixins_1.length; _i++) {
        var mixin = mixins_1[_i];
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_type_r__["mergeProps"])(spec, mixin, reactMixinRules);
    }
    return __WEBPACK_IMPORTED_MODULE_0_react__["createClass"](spec);
}
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.define = function (protoProps, staticProps) {
        var BaseClass = __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].getBaseClass(this), staticsDefinition = __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].getChangedStatics(this, 'state', 'store', 'props', 'autobind', 'context', 'childContext', 'pureRender'), combinedDefinition = __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].assign(staticsDefinition, protoProps || {});
        var definition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__define__["c" /* default */])(combinedDefinition, this.prototype);
        var getDefaultProps = definition.getDefaultProps, propTypes = definition.propTypes, contextTypes = definition.contextTypes, childContextTypes = definition.childContextTypes, protoDefinition = __rest(definition, ["getDefaultProps", "propTypes", "contextTypes", "childContextTypes"]);
        if (getDefaultProps)
            this.defaultProps = definition.getDefaultProps();
        if (propTypes)
            this.propTypes = propTypes;
        if (contextTypes)
            this.contextTypes = contextTypes;
        if (childContextTypes)
            this.childContextTypes = childContextTypes;
        __WEBPACK_IMPORTED_MODULE_1_type_r__["Mixable"].define.call(this, protoDefinition, staticProps);
        return this;
    };
    Component.prototype.assignToState = function (x, key) {
        this.state.assignFrom((_a = {}, _a[key] = x, _a));
        var _a;
    };
    return Component;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
Component = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_type_r__["extendable"],
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"])(reactMixinRules)
], Component);
ReactMVx.Component = Component;
ReactMVx.assignToState = Component.prototype.assignToState;


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map