import * as React from 'react'
import { define, Record, Store, mixins, mergeProps, extendable, mixinRules, tools, Mixable, MixinRules } from 'type-r'
import processSpec, { Node, Element, TypeSpecs } from './define'
import Link from './Link'

// extend React namespace
const ReactMVx = Object.create( React );
// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
export = ReactMVx;

// listenToProps, listenToState, model, attributes, Model
ReactMVx.createClass = createClass;
ReactMVx.Component = Component;
ReactMVx.define = define;
ReactMVx.mixins = mixins;

ReactMVx.Node = Node.value( null );
ReactMVx.Element = Element.value( null );
ReactMVx.Link = Link;

const reactMixinRules : MixinRules = {
    componentWillMount        : 'reverse',
    componentDidMount         : 'reverse',
    componentWillReceiveProps : 'reverse',
    shouldComponentUpdate     : 'some',
    componentWillUpdate       : 'reverse',
    componentDidUpdate        : 'reverse',
    componentWillUnmount      : 'sequence',
    state                     : 'merge',
    store                     : 'merge',
    props                     : 'merge',
    context                   : 'merge',
    childContext              : 'merge',
    getChildContext           : 'mergeSequence'
};

function createClass( a_spec ){
    const { mixins = [], ...spec } = processSpec( a_spec );
    
    // We have the reversed sequence for the majority of the lifecycle hooks.
    // So, mixins lifecycle methods works first. It's important.
    // To make it consistent with class mixins implementation, we override React mixins.
    for( let mixin of mixins ){
        mergeProps( spec, mixin, reactMixinRules );
    }

    return React.createClass( spec );
}

@extendable
@mixinRules( reactMixinRules )
class Component<P> extends React.Component<P, Record> {
    static state? : TypeSpecs | typeof Record
    static store? : TypeSpecs | typeof Store
    static props? : TypeSpecs
    static autobind? : string
    static context? : TypeSpecs
    static childContext? : TypeSpecs
    static pureRender? : boolean

    private static propTypes: any;
    private static defaultProps: any;
    private static contextTypes : any;
    private static childContextTypes : any;

    static define( protoProps, staticProps ){
        var BaseClass          = tools.getBaseClass( this ),
            staticsDefinition = tools.getChangedStatics( this, 'state', 'store', 'props', 'autobind', 'context', 'childContext', 'pureRender' ),
            combinedDefinition = tools.assign( staticsDefinition, protoProps || {} );

        var definition = processSpec( combinedDefinition, this.prototype );

        const { getDefaultProps, propTypes, contextTypes, childContextTypes, ...protoDefinition } = definition;

        if( getDefaultProps ) this.defaultProps = definition.getDefaultProps();
        if( propTypes ) this.propTypes = propTypes;
        if( contextTypes ) this.contextTypes = contextTypes;
        if( childContextTypes ) this.childContextTypes = childContextTypes;

        Mixable.define.call( this, protoDefinition, staticProps );

        return this;
    }
}

ReactMVx.Component = Component;