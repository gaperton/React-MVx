# Component API

```javascript
import React, { define } from 'react-mvx'

@define class MyComponent extends React.Component {
    render(){
        return <h1>Hello World</h1>;
    }
}
```

The universal Component base class.

## `static` props = { name : Annotation }

Component props declaration. Replaces standard `PropTypes`. Type annotation syntax:

- `Constructor` - puts the instanceOf constraint on props type. Use `Number`, `String`, and `Boolean` for primitive types.
- `Constructor.value( val )` or just `val` - property has the default value.
- `Constructor.isRequired` - property is mandatory.
- `RecordOrCollection.has.changeEvents( true )` - update the component on any inner change in the property.
- `EventSource.has.changeEvents( 'event1 event2 ...' )` - update the component on any of the specified events triggered by the property.
- `EventSource.has.events({ [ events ] : handlerFunction | 'methodName' })` - subscribe for events from the property.
- `Constructor.has.watcher( watcherFunction | 'methodName' )` - call the watcher when new prop value is received.

Type annotations listed above may be chained.

## `static` pureRender = true

Generate and attach the "pure render" optimization mixin. Mixin prevents the subsequent render calls in case if props were unchanged.
Mixin *detects and takes into account inner changes* of records and collections as well.

`static props` declaration is required for `pureRender` to work. Only declared props will be compared.

## `static` state = { name : Annotation } | RecordConstructor

Component state declaration. State is modeled as `Record` either referenced by Constructor or imlicitly defined with a given attributes declaration.
`state` Record is created before the component mount, and is disposed when component is unmounted.

- `Constructor` - initialize attribute with the default value of the given constructor.
- `Constructor.value( val )` or just `val` - provide different default value.
- `Constructor.isRequired` - put 'not empty' validation check on the attribute.
- `Constructor.has.check( predicate )` - put custom validation check on the attribute.
- `RecordOrCollection.has.changeEvents( false )` - *do not update* the component on any inner changes of the attribute.
- `EventSource.has.events({ [ events ] : handlerFunction | 'methodName' })` - subscribe for events from the attribute.
- `Constructor.has.watcher( watcherFunction | 'methodName' )` - call the watcher when the attribute is changed.

Type annotations listed above may be chained. Please, refer to the [Type-R] type annotations reference for the complete list of options.

## state : Record

Replaces standard React's `state` and `setState`. Holds an object of the `Record` subclass.

Use direct assignments to modify the state:

    this.state.x = 5;

Use `transaction()` call to groupe the sequence of changes in single UI update transaction.

## transaction( fun )

Group the sequence of state (and props) updates in the single transaction leading to single UI update.

```javascript
this.transaction( state => {
    state.a++;
    state.b++;
    this.props.collection.reset();
});
```

Read more about transactions in Type-R manual.

## `static` store = { name : Annotation } | Store | StoreConstructor

Stores in Type-R are internally similar to the Record and used to resolve one-to-many and many-to-many relationships by id.
Stores *must not* be used to store UI state; they are intended to hold the shared domain state which is cross-referenced by id.

There may be many stores in Rect-MVx. There is the single _default store_ (`Store.global`) which is used to cache the data which must be accessible across the pages.

Specifying the store for the top-level component sets this store as the primary one for all the internal state of the current component subtree.

- `static store = referenceToTheExistingStore`. Update the UI on store changes.
- `static store = StoreConstructor`. Creates the local store with the lifetime bound to the component's one.
- `static store = { attributes }`. Implicitly create the Store subclass from the given attribute spec.

## store : Store

When the `static store` is defined, provide the access to the store in component.

Store *is not* directly accessible to the subcomponents; you have to pass values down as props.

## `static` context = { name : Annotation }

Replacement for standard `contextTypes`. Just `Constructor` may be used as type annotation.

## `static` childContext = { name : Annotation }

Replacement for standard `childContextTypes`. Just `Constructor` may be used as type annotation.

`getChildContext()` function is required to create the context as in raw React.

## linkAt( 'key' ) : Link

Create the [value link]() for the state member `key`. All records support `linkAt()` method as well.

## linkAll() : { [ name ] : Link }

Create the [value links]() for all (or specified) the state members. All records support `linkAll()` method as well.

## asyncUpdate()

Safe version of the `forceUpdate()`. Gracefully handles component disposal and UI update transactions.

Shall be used in place of every manual call to `forceUpdate()`.