## store
### `static` store = { name : Annotation } | Store | StoreConstructor

Stores in Type-R are internally similar to the Record and used to resolve one-to-many and many-to-many relationships by id.
Stores *must not* be used to store UI state; they are intended to hold the shared domain state which is cross-referenced by id.

There may be many stores in Rect-MVx. There is the single _default store_ (`Store.global`) which is used to cache the data which must be accessible across the pages.

Specifying the store for the top-level component sets this store as the primary one for all the internal state of the current component subtree.

- `static store = referenceToTheExistingStore`. Update the UI on store changes.
- `static store = StoreConstructor`. Creates the local store with the lifetime bound to the component's one.
- `static store = { attributes }`. Implicitly create the Store subclass from the given attribute spec.

### store : Store

When the `static store` is defined, provide the access to the store in component.

Store *is not* directly accessible to the subcomponents; you have to pass values down as props.
