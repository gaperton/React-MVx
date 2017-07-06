/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */

import { collectSpecs, compileSpecs, TypeSpecs } from './typeSpecs'
import { PureRenderMixin, createChangeTokensConstructor } from './pureRender'
import { tools } from 'type-r'

export interface PropsMetadata {
    pureRender? : boolean
    _props? : TypeSpecs
}

export default function process( Class, { props, pureRender } ){
    const { prototype } = Class;

    // process props spec...
    if( props ){
        // Merge with inherited members...
        prototype._props = tools.defaults( props, prototype._props || {} );

        const { propTypes, defaults, watchers, changeHandlers } = compileSpecs( props );
        Class.propTypes = propTypes;

        if( defaults ) Class.defaultProps = defaults;

        if( watchers ){
            prototype._watchers = watchers;
            Class.mixins.merge([ WatchersMixin ]);
        }

        if( changeHandlers ){
            prototype._changeHandlers = changeHandlers;
            Class.mixins.merge([ ChangeHandlersMixin ]);
        }

        if( prototype.pureRender ){
            prototype.PropsChangeTokens = createChangeTokensConstructor( props );
        }
    }

    if( pureRender ){
        Class.mixins.merge([ PureRenderMixin ]);
    }
}

/**
 * ChangeHandlers are fired in sequence upon props replacement.
 * Fires _after_ UI is updated. Used for managing events subscriptions.
 */
const ChangeHandlersMixin = {
    componentDidMount(){
        handlePropsChanges( this, {}, this.props );
    },

    componentDidUpdate( prev ){
        handlePropsChanges( this, prev, this.props );
    },

    componentWillUnmount(){
        handlePropsChanges( this, this.props, {} );
    }
};

function handlePropsChanges( component : any, prev : object, next : object ){
    const { _changeHandlers } = component;
    
    for( let name in _changeHandlers ){
        if( prev[ name ] !== next[ name ] ){
            for( let handler of _changeHandlers[ name ] ){
                handler( next[ name ], prev[ name ], component );
            }
        }
    }
}

/**
 * Watchers works on props replacement and fires _before_ any change will be applied and UI is updated.
 * Fired in componentWillMount as well, which makes it a nice way to sync state from props.
 */
const WatchersMixin = {
    componentWillReceiveProps( next ){
        const { _watchers, props } = this;

        for( let name in _watchers ){
            if( next[ name ] !== props[ name ] ){
                _watchers[ name ].call( this, next[ name ], name );
            }        
        }
    },

    componentWillMount(){
        const { _watchers, props } = this;

        for( let name in _watchers ){
            _watchers[ name ].call( this, props[ name ], name );
        }
    }
}