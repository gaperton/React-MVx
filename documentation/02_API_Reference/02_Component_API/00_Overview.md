# React-MVx UI Component

React-MVx extends React namespace and should be used instead of `react`.
All class Component definitions must be preceeded with the `@define` decorator.

```javascript
import React, { define } from 'react-mvx'

@define class Hello extends React.Component {
    render(){
        return <h1>'Hi there!'</h1>;
    }
}
```

React-MVx is built around the idea of _universal state management_ featuring 
the same technique to manage the local component state, application page state,
and the global application state.




### Common type annotations

Following type annotations shared across all Component declarations.

 Annotation | state/store | props | context | Description
 -----------|-------------| ------|--------|-
| `Ctor` | x | x | x | element has specified type
| `Ctor.isRequired` | x | x | x | element is required
| `Ctor.value( defaultValue )` | x | x | | element has default value
| `defaultValue` | x | x | | element has default value
| `Ctor.has.watcher(...)`| x | x | | custom reaction on element's change 
| `Ctor.has.events(...)`| x | x | | listen to custom events from the element
| `Ctor.has.changeEvents(...)`| x | x | | Update on element's changes

### State/Store/Record only attributes annotations

Annotation | Description
-----------|-------------
| `Ctor.has.check(...)`| attach attribute's validator |
| `Record.shared`| attribute holds the reference to the record |
| `Collection.Refs`| collection of references to the records |
| `Record.from(...)`| reference to the record from the specified collection |
| `Collection.subsetOf(...)`| collection of references to the records from the specified collection |
| `Ctor.has.parse(...)`| custom parse hook |
| `Ctor.has.toJSON(...)`| custom serialization hook |
| `Ctor.has.get(...)`| attribute read hook |
| `Ctor.has.set(...)`| attribute write hook |
| `Ctor.has.metadata(...)`| attach custom metadata to the attribute |
