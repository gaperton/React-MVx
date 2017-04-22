import { define, mixins, mixinRules, ChainableAttributeSpec } from 'type-r';
import Link from './link';
import { Component, createClass } from './component';
interface ReactMVx {
    default: ReactMVx;
    define: typeof define;
    mixins: typeof mixins;
    mixinRules: typeof mixinRules;
    createClass: typeof createClass;
    Component: typeof Component;
    Link: typeof Link;
    Node: ChainableAttributeSpec;
    Element: ChainableAttributeSpec;
    assignToState: typeof Component.prototype.assignToState;
}
declare const ReactMVx: ReactMVx;
export default ReactMVx;
