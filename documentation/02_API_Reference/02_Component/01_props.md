Component _props declaration_ replaces standard React's `propTypes` and `defaultProps`.

```javascript
import React, { define } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        propName : TypeAnnotation,
        ...
    }
}
```

[TOC]

## Type assertions

Use `Constructor` functions for optional props. Add `Constuctor.isRequired` for required props.

`static props` declaration will be compiled to corresponding `propTypes` and will produce the run-time
type asserts and warnings.

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

## Default values (.value(...))

`Constructor.value( defaultValue )` or just `defaultValue` is used to specify the default value. In the last case
the type will be inferred from the `defaultValue`.

```javascript
import React, { define } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        withDefault : String.value( 'defaultValue' ),
        anotherDefault : 'defaultValue'
    }
}
```

Any function in props annotation is treated as a constructor. Thus, `Function.value( defaultValue )` must be used to specify the defaults for functions.

## Watchers

Component can track changes of individual props through _watchers_ attached to the props.
Watcher is the function taking the new prop value, which is called first time after the component is
mounted and every time component receives the new props and this particular prop is changed.

```javascript
import React, { define } from 'react-mvx'

@define class PropsDemo extends React.Component {
    static props = {
        first : String.has.watcher( 'onFirstChange' ),
        // Render when record is added to or removed from the collection
        second : Number.has.watcher( second => console.log( 'Received new prop:', second ) )
    }

    onFirstChange( newValue, propName ){
        console.log( 'First prop is about to change:', newValue );
    }
}
```

## UI updates on internal props changes (.has.changeEvents(...))

Component can observe changes _inside of the records and collections_ and trigger the local UI update.

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

## Subscribe for events from props (.has.events(...))

Type annotation syntax:

- `EventSource.has.events({ [ events ] : handlerFunction | 'methodName' })` - subscribe for events from the property.
