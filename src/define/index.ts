import { ComponentClass } from './common'
import { Messenger } from 'type-r'

import defineStore, { StoreDefinition } from './store'
import defineState, { StateDefinition } from './state'
import defineContext, { ContextDefinition } from './context'
import defineProps, { PropsDefinition } from './props'

export interface ComponentDefinition extends StoreDefinition, StateDefinition, ContextDefinition, PropsDefinition {}
export interface ComponentProto extends StoreProto, StateProto, ContextProto, PropsProto {}

export default function onDefine( this : ComponentClass<ComponentProto>, definition : ComponentDefinition, BaseClass : ComponentClass<ComponentProto> ){
    // Initialize mixins placeholder...
    defineStore( this, definition, BaseClass );
    defineState( this, definition, BaseClass );
    defineContext.call( this, definition, BaseClass );
    defineProps( this, definition, BaseClass );

    Messenger.onDefine.call( this, definition, BaseClass );
};

export { Node, Element, TypeSpecs } from './typeSpecs'
