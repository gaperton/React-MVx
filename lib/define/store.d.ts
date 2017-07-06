import { Store, MixableConstructor } from 'type-r';
export interface StoreDefinition {
    store?: typeof Store | Store | object;
    Store?: typeof Store;
}
export interface ComponentConstructor extends MixableConstructor {
    prototype: {
        store: Store;
        Store: typeof Store;
    };
}
export default function process(Class: ComponentConstructor, definition: StoreDefinition): void;
