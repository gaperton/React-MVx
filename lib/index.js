import * as React from 'react';
import { define, mixins } from 'type-r';
import { Node, Element } from './define';
import Link from './Link';
import { Component, createClass } from './component';
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
ReactMVx.Component = Component;
ReactMVx.assignToState = Component.prototype.assignToState;
//# sourceMappingURL=index.js.map