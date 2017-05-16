## state 
### `static` state = { name : Annotation } | RecordConstructor

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

### state : Record

Replaces standard React's `state` and `setState`. Holds an object of the `Record` subclass.

Use direct assignments to modify the state:

    this.state.x = 5;

Use `transaction()` call to groupe the sequence of changes in single UI update transaction.
