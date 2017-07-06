/*****************
 * State
 */
import { define, Record, Store } from 'type-r'

export default function process( Class, definition ){
    const { prototype } = Class;

    let { state, State } = definition;

    if( typeof state === 'function' ){
        State = state;
        state = void 0;
    }

    if( state ){
        const BaseClass = State || Class.prototype.State || Record;

        @define class ComponentState extends BaseClass {
            static attributes = state;
        }

        Class.prototype.State = ComponentState;
    }
    else if( State ){
        Class.prototype.State = State;
    }

    if( state || State ){
        Class.mixins.merge([ StateMixin, UpdateOnNestedChangesMixin ]);
    }
}

export const StateMixin = {
    //state : null,

    componentWillMount(){
        // props.__keepState is used to workaround issues in Backbone intergation layer
        const state = this.state = this.props.__keepState || new this.State();
        
        // Take ownership on state...
        state._owner = this;
        state._ownerKey = 'state';
    },

    context : {
        _nestedStore : Store
    },

    // reference global store to fix model's store locator
    getStore(){
        // Attempt to get the store from the context first. Then - fallback to the state's default store.
        // TBD: Need to figure out a good way of managing local stores.
        let context, state;

        return  ( ( context = this.context ) && context._nestedStore ) ||
                ( ( state = this.state ) && state._defaultStore );
    },

    componentWillUnmount(){
        const { state } = this;
        state._owner = state._ownerKey = void 0;
        this._preventDispose /* hack for component-view to preserve the state */ || state.dispose();
        this.state = void 0;
    }
};

export const UpdateOnNestedChangesMixin = {
    _onChildrenChange(){},

    componentDidMount(){
        this._onChildrenChange = this.asyncUpdate;
    }
};