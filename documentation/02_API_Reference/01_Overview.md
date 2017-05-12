## React-MVx API Overview

The universal Component base class.

```javascript
import React, { define } from 'react-mvx'

@define class MyComponent extends React.Component {
    render(){
        return <h1>Hello World</h1>;
    }
}
```