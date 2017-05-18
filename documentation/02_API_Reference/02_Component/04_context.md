Static `context` and `childContext` declarations replaces React's standard `contextTypes` and `childContextTypes`.

#### `static` context = { name : `propDef`, ... }

Replacement for standard `contextTypes`.

#### `static` childContext = { name : `propDef`, ... }

Replacement for standard `childContextTypes`.

`getChildContext()` function is required to create the context as in raw React.

### Context declarations

Subset of `static props` declaration is supported for the context `propDef`.

#### `propDef` name : Constructor

Checks whenever the value is an instance of the `Constructor` and puts the warning to the console if the prop type is not compatible.

#### `propDef` name : Constructor.isRequired

Value is required.