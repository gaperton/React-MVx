Component's state is modeled as Type-R `Record`. Record is created before `componentWillMount()` and disposed after `componentWillUnmount()`.
All changed inside of the state record are observed, and the component is updated in case of change.

#### `static` state = RecordConstructor

Define stateful component with the state Record declared externally.

#### `static` state = { name : `decl`, ... }

Implicitly define state Record with a given attributes declaration.

#### component.state

Holds an object of the `Record` subclass.

Use direct assignments to modify the state:

    this.state.x = 5;

Use `component.transaction()` call to group the sequence of changes in single UI update transaction.

#### component.transaction( fun )

Group the sequence of state (and props) updates in the single transaction leading to single UI update.

```javascript
this.transaction( state => {
    state.a++;
    state.b++;
    this.props.collection.reset();
});
```

Read more about transactions in Type-R manual.

### State declaration

As the state is internally the Type-R Record, it uses the same declarations.
Please, refer to the [../04_Record] attribute declarations for the complete list of options.