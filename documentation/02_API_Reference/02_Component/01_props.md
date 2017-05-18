Component _static props declaration_ replaces standard React's `propTypes` and `defaultProps`.

#### `static` props = { name : `propDef`, ... }

Declare component props. Declaration is an object 

```javascript
import React, { define } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        name : Declaration,
        ...
    }
}
```

#### `static` pureRender = true

Prevents subsequent render calls in case if props were unchanged. It's known as "pure render" optimization.

*Inner changes of records and collections* are detected and taken into account. Thus, it works properly with mutable records and collections.

`static props` declaration is required for `pureRender` to work. Only declared props will be tracked and compared.

### Properties declarations

#### `propDef` name : Constructor

Checks if component prop is an instance of the `Constructor` and puts the warning to the console if the prop type is not compatible.

#### `propDef` name : Constructor.isRequired

Mark property as required.

```javascript
import React, { define } from 'react-mvx'
@define class PropsDemo extends React.Component {
    static props = {
        // Simple form of annotation is just the constructor function designating the type.
        optionalArray: Array,
        optionalBool: Boolean,
        optionalFunc: Function,
        optionalNumber: Number,
        optionalObject: Object,
        optionalString: String,
        optionalSymbol: Symbol,   
        
        // Anything that can be rendered: numbers, strings, elements or an array
        // (or fragment) containing these types.
        optionalNode: React.Node,

        // A React element.
        optionalElement: React.Element,

        // You can also declare that a prop is an instance of a class.
        optionalMessage: Message,

        // You can chain any of the above with `isRequired` to make sure a warning
        // is shown if the prop isn't provided.
        requiredFunction : Function.isRequired
    };
    ...
}
```

#### `propDef` name : Constructor.value( defaultValue )

Assign default property value.

#### `propDef` name : defaultValue

Assign default property value. The the type will be inferred from the `defaultValue`.

Any function in props annotation is treated as a constructor. Thus, `Function.value( defaultValue )` must be used to specify the defaults for functions.

```javascript
import React, { define } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        withDefault : String.value( 'defaultValue' ),
        anotherDefault : 'defaultValue'
    }
}
```

#### `propDef` name : Constructor.has.watcher( 'componentMethodName' )

#### `propDef` name : Constructor.has.watcher( function( newValue, name ){ ... } )

_Watcher_ is the function which is called when the particular prop is assigned with new value.

Watcher is called after `componentWillMount`, and may be called during `componentWillReceiveProps` if the property is changed.
Watcher is executed in the context of the component.

```javascript
import React, { define } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        first : String.has.watcher( 'onFirstChange' ),
        second : Number.has.watcher( second => console.log( 'Received new prop:', second ) )
    }

    onFirstChange( newValue, name ){
        console.log( 'First prop is about to change:', newValue );
    }
}
```

#### `propDef` name : RecordOrCollection.has.changeEvents( true )

Observe _internal changes_ of the record or collection and update the component in case of changes.

#### `propDef` name : EventSource.has.changeEvents( 'event1 event2 ...' )

Update the component in case if property triggers any of the listed events.

```javascript
import React, { define } from 'react-mvx'
import { Record } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        // Render on every change
        trackInnerChanges : Record.has.changeEvents( true ),
        // Render when record is added to or removed from the collection
        anotherDefault : Collection.has.changeEvents( 'add remove' )
    }
}
```

#### `propDef` name : EventSource.has.events({ event : handler, ... })

Subscribe for events from the component property. `handler` can either be the name of the component's method,
or the function handling the event. Handler is executed in the context of the component.