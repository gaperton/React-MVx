import { define, Store, MixableConstructor } from 'type-r'
import { StateMixin, UpdateOnNestedChangesMixin } from './state'

export interface StoreDefinition {
    store? : typeof Store | Store | object
    Store? : typeof Store
}

export interface ComponentConstructor extends MixableConstructor {
    prototype : {
        store : Store
        Store : typeof Store
    }
}

export default function process( Class : ComponentConstructor, definition : StoreDefinition ){
    let { store, Store : StoreClass } = definition;

    if( store && store instanceof Store ){
        // Direct reference to an existing store. Put it to the prototype.
        Class.prototype.store = store;
        Class.mixins.merge([ ExternalStoreMixin, ExposeStoreMixin ]);
    }
    else if( store || definition.Store ) {
        if( typeof store === 'function' ){
            StoreClass = store;
            store = void 0;
        }

        if( store ){
            const BaseClass = StoreClass || Class.prototype.Store || Store;
            @define class InternalStore extends BaseClass {
                static attrbutes = store;
            };

            Class.prototype.Store = InternalStore;
        }
        else if( StoreClass ){
            Class.prototype.Store = StoreClass;
        }

        Class.mixins.merge([ InternalStoreMixin, UpdateOnNestedChangesMixin, ExposeStoreMixin ]);
    }
}

/**
 * Attached whenever the store declaration of any form is present in the component.
 */
const ExposeStoreMixin = {
    childContext : {
        _nestedStore : Store
    },

    getChildContext(){
        return { _nestedStore : this.store };
    },

    getStore(){
        return this.store;
    },

    // Will be called by the store when the lookup will fail.
    get( key ){
        // Ask upper store.
        const store = StateMixin.getStore.call( this, key );
        return store && store.get( key );
    }
};

/**
 * External store must just track the changes and trigger render.
 * TBD: don't use it yet.
 */
const ExternalStoreMixin = {
    componentDidMount(){
        // Start UI updates on state changes.
        this.listenTo( this.store, 'change', this.asyncUpdate );
    }
};

const InternalStoreMixin = {
    componentWillMount(){
        var store = this.store = new this.Store();
        store._owner = this;
        store._ownerKey = 'store';
    },

    componentWillUnmount(){
        this.store._ownerKey = this.store._owner = void 0;
        this.store.dispose();
        this.store = void 0;
    }
};
