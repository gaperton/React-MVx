Component's state is modeled as Type-R `Record`. Record is created before `componentWillMount()` and disposed after `componentWillUnmount()`.
All changed inside of the state record are observed, and the component is updated in case of change.

# Declarations

### `static` state = RecordConstructor

Define stateful component with the state Record declared externally.

### `static` state = { name : `attrDef`, ... }

Implicitly define state Record with a given attributes declaration. All declarations working on `props` works for the state as well. Refer to the Record documentation for the attributes declaration syntax.

# Class members

### component.state

Holds an object of the `Record` subclass. 

*Do not use `component.setState()`*. Use direct assignments to modify the state:

    this.state.x = 5;

Refer to the Record documentation for the complete list of methods.

### component.transaction( fun )

Group the sequence of state (and props) updates in the single transaction leading to single UI update.

    this.transaction( state => {
        state.a++;
        state.b++;
        this.props.collection.reset();
    });

Read more about transactions in Record's manual.