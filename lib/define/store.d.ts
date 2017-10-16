import { Store } from 'type-r';
import { ComponentClass } from './common';
export interface StoreDefinition {
    store?: typeof Store | Store | object;
    Store?: typeof Store;
}
export interface StoreProto {
    store?: Store;
    Store?: typeof Store;
}
export default function process(this: ComponentClass<StoreProto>, definition: StoreDefinition, Class: ComponentClass<StoreProto>): void;
