Component's state is modeled as Type-R `Record`. Record is created before `componentWillMount()` and disposed after `componentWillUnmount()`.
All changed inside of the state record are observed, and the component is updated in case of change.

#### `static` state = RecordConstructor

Define stateful component with the state Record declared externally.

#### `static` state = { name : `decl` }

Implicitly define state Record with a given attributes declaration.

- `Constructor` - initialize attribute with the default value of the given constructor.
- `Constructor.value( val )` or just `val` - provide different default value.
- `Constructor.isRequired` - put 'not empty' validation check on the attribute.
- `Constructor.has.check( predicate )` - put custom validation check on the attribute.
- `RecordOrCollection.has.changeEvents( false )` - *do not update* the component on any inner changes of the attribute.
- `EventSource.has.events({ [ events ] : handlerFunction | 'methodName' })` - subscribe for events from the attribute.
- `Constructor.has.watcher( watcherFunction | 'methodName' )` - call the watcher when the attribute is changed.

Type annotations listed above may be chained. Please, refer to the [Type-R] type annotations reference for the complete list of options.

#### component.state

Holds an object of the `Record` subclass.

Use direct assignments to modify the state:

    this.state.x = 5;

Use `component.transaction()` call to group the sequence of changes in single UI update transaction.
