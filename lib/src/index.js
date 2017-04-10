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
import * as React from 'react';
import { define, mixins, mergeProps, extendable, mixinRules, tools, Mixable } from 'type-r';
import processSpec, { Node, Element } from './define';
import Link from './Link';
// extend React namespace
var ReactMVx = Object.create(React);
// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
export default ReactMVx;
// listenToProps, listenToState, model, attributes, Model
ReactMVx.createClass = createClass;
ReactMVx.define = define;
ReactMVx.mixins = mixins;
ReactMVx.Node = Node.value(null);
ReactMVx.Element = Element.value(null);
ReactMVx.Link = Link;
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
    var _a = processSpec(a_spec), _b = _a.mixins, mixins = _b === void 0 ? [] : _b, spec = __rest(_a, ["mixins"]);
    // We have the reversed sequence for the majority of the lifecycle hooks.
    // So, mixins lifecycle methods works first. It's important.
    // To make it consistent with class mixins implementation, we override React mixins.
    for (var _i = 0, mixins_1 = mixins; _i < mixins_1.length; _i++) {
        var mixin = mixins_1[_i];
        mergeProps(spec, mixin, reactMixinRules);
    }
    return React.createClass(spec);
}
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.define = function (protoProps, staticProps) {
        var BaseClass = tools.getBaseClass(this), staticsDefinition = tools.getChangedStatics(this, 'state', 'store', 'props', 'autobind', 'context', 'childContext', 'pureRender'), combinedDefinition = tools.assign(staticsDefinition, protoProps || {});
        var definition = processSpec(combinedDefinition, this.prototype);
        var getDefaultProps = definition.getDefaultProps, propTypes = definition.propTypes, contextTypes = definition.contextTypes, childContextTypes = definition.childContextTypes, protoDefinition = __rest(definition, ["getDefaultProps", "propTypes", "contextTypes", "childContextTypes"]);
        if (getDefaultProps)
            this.defaultProps = definition.getDefaultProps();
        if (propTypes)
            this.propTypes = propTypes;
        if (contextTypes)
            this.contextTypes = contextTypes;
        if (childContextTypes)
            this.childContextTypes = childContextTypes;
        Mixable.define.call(this, protoDefinition, staticProps);
        return this;
    };
    Component.prototype.assignToState = function (x, key) {
        this.state.assignFrom((_a = {}, _a[key] = x, _a));
        var _a;
    };
    return Component;
}(React.Component));
Component = __decorate([
    extendable,
    mixinRules(reactMixinRules)
], Component);
ReactMVx.Component = Component;
ReactMVx.assignToState = Component.prototype.assignToState;
//# sourceMappingURL=index.js.map